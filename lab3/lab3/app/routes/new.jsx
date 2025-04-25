
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function NewBook() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Zaloguj się najpierw!");
      return;
    }
    await addDoc(collection(db, "books"), {
      title,
      author,
      ownerId: user.uid,
      createdAt: serverTimestamp(),
    });
    navigate("/my");
  };

  return (
    <main className="p-4">
      <h1>Dodaj nową książkę</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tytuł</label>
          <input
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Autor</label>
          <input
            className="border p-2 w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Dodaj
        </button>
      </form>
    </main>
  );
}
