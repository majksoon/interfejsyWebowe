
import React, { useState, useMemo } from "react";
import { useBooks } from "../hooks/useBooks";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function Home() {
  // fetch all books
  const books = useBooks({ onlyMine: false });
  // local state for the search term
  const [filter, setFilter] = useState("");

  // memoize the filtered list
  const filtered = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return books;
    return books.filter((b) => {
      return (
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term)
      );
    });
  }, [books, filter]);

  const handleDelete = async (id) => {
    if (window.confirm("Na pewno usunąć tę książkę?")) {
      await deleteDoc(doc(db, "books", id));
    }
  };

  return (
    <main className="container">
      <h1>Wszystkie książki</h1>

      {/* Search field */}
      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Szukaj po tytule lub autorze…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "0.375rem",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p>Brak książek spełniających kryteria.</p>
      ) : (
        <div className="book-list">
          {filtered.map((b) => (
            <div key={b.id} className="book-card">
              <div>
                <h2>{b.title}</h2>
                <p style={{ color: "#555" }}>Autor: {b.author}</p>
              </div>
              <div className="book-actions">
                <Link to={`/edit/${b.id}`}>
                  <button className="btn btn-secondary">Edytuj</button>
                </Link>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="btn btn-primary"
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
