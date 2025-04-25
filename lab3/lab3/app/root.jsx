
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/index.jsx";
import MyBooks from "./routes/my.jsx";
import NewBook from "./routes/new.jsx";
import EditBook from "./routes/edit.$id.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* kontener dla treści */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="my" element={<MyBooks />} />
          <Route path="new" element={<NewBook />} />
          <Route path="edit/:id" element={<EditBook />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
