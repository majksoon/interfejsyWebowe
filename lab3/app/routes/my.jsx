import React from "react";
import { useBooks } from "../hooks/useBooks";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function MyBooks() {
  const books = useBooks({ onlyMine: true });

  const handleDelete = async (id) => {
    if (!confirm("Na pewno usunąć?")) return;
    try {
      await deleteDoc(doc(db, "books", id));
    } catch (e) {
      console.error(e);
      alert("Błąd przy usuwaniu.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Moje książki</h1>
      {books.length === 0 ? (
        <p>Nie dodałeś jeszcze żadnej książki.</p>
      ) : (
        <ul className="space-y-2">
          {books.map((b) => (
            <li
              key={b.id}
              className="p-4 bg-white rounded shadow flex justify-between"
            >
              <span>
                <strong>{b.title}</strong> – {b.author}
              </span>
              <div className="space-x-2">
                <Link to={`/edit/${b.id}`}>
                  <button className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500">
                    Edytuj
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
