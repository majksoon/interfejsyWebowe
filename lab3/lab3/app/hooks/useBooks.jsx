import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export function useBooks({ onlyMine = false }) {
  const [user] = useAuthState(auth);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let q = query(collection(db, "books"));
    if (onlyMine && user) {
      q = query(q, where("ownerId", "==", user.uid));
    }
    const unsub = onSnapshot(q, (snap) =>
      setBooks(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    return () => unsub();
  }, [onlyMine, user]);

  return books;
}
