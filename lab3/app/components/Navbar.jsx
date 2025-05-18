import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, login, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    (isActive ? "underline " : "") + "px-2 py-1 hover:bg-blue-500 rounded";

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="space-x-4">
        <NavLink to="/" end className={linkClass}>
          Wszystkie
        </NavLink>
        <NavLink to="/my" className={linkClass}>
          Moje
        </NavLink>
        <NavLink to="/new" className={linkClass}>
          Nowa
        </NavLink>
      </div>
      <div>
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Wyloguj
          </button>
        ) : (
          <button
            onClick={login}
            className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded"
          >
            Zaloguj przez Google
          </button>
        )}
      </div>
    </nav>
  );
}
