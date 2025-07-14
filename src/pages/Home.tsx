// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/api/blogs`, {
          headers: { Authorization: token },
        });
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            author={blog.author.username}
            content={blog.content}
            onClick={() => navigate(`/blogs/${blog._id}`)}
          />
        ))
      )}
    </div>
  );
};

export default Home;
