import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Welcome />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <BlogDetail />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id/edit"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <EditBlog />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <CreateBlog />
              </>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
