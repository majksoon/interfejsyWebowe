import React, { useState, useMemo } from "react";
import { useBooks } from "../hooks/useBooks";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function Home() {
  const books = useBooks({ onlyMine: false });
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const term = filter.toLowerCase().trim();
    return term
      ? books.filter(
          (b) =>
            b.title.toLowerCase().includes(term) ||
            b.author.toLowerCase().includes(term)
        )
      : books;
  }, [books, filter]);

  const handleDelete = async (id) => {
    if (!confirm("Na pewno usunąć?")) return;
    await deleteDoc(doc(db, "books", id));
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wszystkie książki</h1>
      <input
        type="text"
        placeholder="Szukaj…"
        data-cy="search-input"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      {filtered.length === 0 ? (
        <p>Brak książek.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="book-card p-4 bg-white rounded shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{b.title}</h2>
                <p className="text-sm text-gray-600">Autor: {b.author}</p>
              </div>
              <div className="mt-4 flex space-x-2">
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
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
