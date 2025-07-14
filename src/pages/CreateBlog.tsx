// src/pages/CreateBlog.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${VITE_BACKEND_URL}/api/blogs`, form, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.message === "blog created") {
        navigate("/blogs");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center px-4">
      <div className="bg-white/80 backdrop-blur-md border border-gray-300 shadow-lg p-10 rounded-xl w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          ✍️ Share Your Story
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          “Writing is the painting of the voice.” — Voltaire
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter blog title..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
            required
          />

          <TextareaAutosize
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog content..."
            minRows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-700"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-2 rounded-full hover:scale-105 hover:shadow transition-all"
          >
            🚀 Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
