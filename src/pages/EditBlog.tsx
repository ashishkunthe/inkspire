// src/pages/EditBlog.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/api/blogs/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const blog = res.data.blog;
        setForm({ title: blog.title, content: blog.content });
        setLoading(false);
      } catch (err: any) {
        setError("Failed to load blog.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.put(`${VITE_BACKEND_URL}/api/blogs/${id}`, form, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate(`/blogs/${id}`);
      alert(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Blog</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
