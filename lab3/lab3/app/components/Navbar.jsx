
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/my">Moje</NavLink>
        </li>
        <li>
          <NavLink to="/new">Nowa książka</NavLink>
        </li>
      </ul>
      {user ? (
        <button onClick={logout} className="auth-btn">
          {user.displayName}
        </button>
      ) : (
        <button onClick={login} className="auth-btn">
          Zaloguj przez Google
        </button>
      )}
    </nav>
  );
}
