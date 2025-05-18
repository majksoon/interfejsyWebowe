// app/routes/new.jsx
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
    // nawet jeśli user nie zdążył się wczytać, podstawiamy test-uid
    const ownerId = user?.uid || "test-uid";
    await addDoc(collection(db, "books"), {
      title,
      author,
      ownerId,
      createdAt: serverTimestamp(),
    });
    navigate("/my");
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dodaj nową książkę</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tytuł</label>
          <input
            type="text"
            placeholder="Tytuł"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Autor</label>
          <input
            type="text"
            placeholder="Autor"
            className="border p-2 w-full rounded"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Dodaj książkę
        </button>
      </form>
    </main>
  );
}
