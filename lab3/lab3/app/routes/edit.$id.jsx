
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "" });

  useEffect(() => {
    async function loadBook() {
      const ref = doc(db, "books", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setBook(snap.data());
      }
    }
    loadBook();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const ref = doc(db, "books", id);
    await updateDoc(ref, {
      title: book.title,
      author: book.author,
      updatedAt: serverTimestamp(),
    });
    navigate("/my");
  };

  const handleDelete = async () => {
    if (window.confirm("Na pewno usunąć?")) {
      await deleteDoc(doc(db, "books", id));
      navigate("/my");
    }
  };

  return (
    <main className="p-4">
      <h1>Edytuj książkę</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Tytuł</label>
          <input
            className="border p-2 w-full"
            value={book.title}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="block mb-1">Autor</label>
          <input
            className="border p-2 w-full"
            value={book.author}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, author: e.target.value }))
            }
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Zapisz zmiany
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Usuń
          </button>
        </div>
      </form>
    </main>
  );
}
