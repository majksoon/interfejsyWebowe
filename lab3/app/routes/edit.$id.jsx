import React, { useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();

  // 1) refy do inputów
  const titleRef = useRef(null);
  const authorRef = useRef(null);

  // 2) załaduj dane raz i ustaw ref.current.value
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "books", id));
        if (snap.exists()) {
          const data = snap.data();
          if (titleRef.current) titleRef.current.value = data.title;
          if (authorRef.current) authorRef.current.value = data.author;
        }
      } catch (e) {
        console.error("Błąd ładowania:", e);
      }
    })();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Musisz być zalogowany.");
      return;
    }

    // 3) odczytaj tylko tu
    const title = titleRef.current.value.trim();
    const author = authorRef.current.value.trim();

    if (!title || !author) {
      alert("Wypełnij oba pola.");
      return;
    }

    try {
      await updateDoc(doc(db, "books", id), {
        title,
        author,
        updatedAt: serverTimestamp(),
      });
      nav("/my");
    } catch (e) {
      console.error("Błąd zapisu:", e);
      alert("Nie udało się zapisać zmian.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Na pewno usunąć?")) return;
    try {
      await deleteDoc(doc(db, "books", id));
      nav("/my");
    } catch (e) {
      console.error("Błąd usuwania:", e);
      alert("Nie udało się usunąć.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edytuj książkę</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tytuł</label>
          <input
            type="text"
            ref={titleRef}
            defaultValue="" // załadowane w useEffect
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Autor</label>
          <input
            type="text"
            ref={authorRef}
            defaultValue=""
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Zapisz
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Usuń
          </button>
        </div>
      </form>
    </div>
  );
}
