
import React from "react";
import { useBooks } from "../hooks/useBooks";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function MyBooks() {
  const books = useBooks({ onlyMine: true });

  const handleDelete = async (id) => {
    if (window.confirm("Na pewno usunąć?")) {
      await deleteDoc(doc(db, "books", id));
    }
  };

  return (
    <main className="p-4">
      <h1>Moje książki</h1>
      {books.length === 0 ? (
        <p>Nie dodałeś jeszcze żadnej książki.</p>
      ) : (
        <ul className="space-y-2">
          {books.map((b) => (
            <li
              key={b.id}
              className="p-2 border rounded flex justify-between items-center"
            >
              <span>
                <strong>{b.title}</strong> – {b.author}
              </span>
              <span className="space-x-2">
                <Link to={`/edit/${b.id}`}>
                  <button className="px-2 py-1 bg-yellow-400 rounded">
                    Edytuj
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Usuń
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
