import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./routes/index.jsx";
import MyBooks from "./routes/my.jsx";
import NewBook from "./routes/new.jsx";
import EditBook from "./routes/edit.$id.jsx";

function RootLayout() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "my", element: <MyBooks /> },
      { path: "new", element: <NewBook /> },
      { path: "edit/:id", element: <EditBook /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
