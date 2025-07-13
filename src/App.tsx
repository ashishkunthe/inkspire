import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Welcome from "./pages/Welcome";

import Navbar from "./components/Navbar";
import type { JSX } from "react";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Login />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/blogs/:id"
          element={<ProtectedRoute element={<BlogDetail />} />}
        />
        <Route
          path="/blogs/:id/edit"
          element={<ProtectedRoute element={<EditBlog />} />}
        />
        <Route
          path="/create"
          element={<ProtectedRoute element={<CreateBlog />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
