import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Heart, HeartCrack } from "lucide-react";
import CommentBox from "../components/CommentBox";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
    _id: string;
  };
  likes: string[];
  comments: {
    _id: string;
    text: string;
    user: {
      _id: string;
      username: string;
    };
  }[];
}

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);

  const token = localStorage.getItem("token") ?? "";
  const userId = localStorage.getItem("userId") ?? "";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/api/blogs/${id}`, {
          headers: { Authorization: token },
        });
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, token]);

  const handleLike = async () => {
    if (!token || !blog) return;
    setLikeLoading(true);
    try {
      const res = await axios.patch(
        `${VITE_BACKEND_URL}/api/blogs/${blog._id}/likes`,
        {},
        { headers: { Authorization: token } }
      );
      setBlog((prev) =>
        prev ? { ...prev, likes: res.data.updatedLikes } : prev
      );
    } catch (err) {
      console.error("Error toggling like", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleAddComment = async (text: string) => {
    if (!token || !blog) return;

    try {
      const res = await axios.post(
        `${VITE_BACKEND_URL}/api/blogs/${blog._id}/comments`,
        { text },
        { headers: { Authorization: token } }
      );

      const newComment = res.data.newComment;

      setBlog((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : prev
      );
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!token || !blog) return;

    try {
      await axios.delete(
        `${VITE_BACKEND_URL}/api/blogs/${blog._id}/comments/${commentId}`,
        {
          headers: { Authorization: token },
        }
      );

      setBlog((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.filter((c) => c._id !== commentId),
            }
          : prev
      );
    } catch (err: any) {
      console.error("Error deleting comment:", err);
      alert(
        err.response?.data?.message ||
          "Failed to delete comment maybe you are not author "
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Blog not found.
      </div>
    );
  }

  const isLiked =
    Array.isArray(blog.likes) && userId && blog.likes.includes(userId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/blogs")}
        className="flex items-center text-gray-600 hover:text-black mb-6 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Blogs
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">By {blog.author.username}</p>

      <div className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-line">
        {blog.content}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className="flex items-center text-sm text-gray-700 hover:text-red-500 transition disabled:opacity-50"
        >
          {isLiked ? (
            <HeartCrack className="w-5 h-5 mr-1 text-red-500" />
          ) : (
            <Heart className="w-5 h-5 mr-1" />
          )}
          {Array.isArray(blog.likes) ? blog.likes.length : 0}{" "}
          {Array.isArray(blog.likes) && blog.likes.length === 1
            ? "Like"
            : "Likes"}
        </button>

        <button
          onClick={() => navigate(`/blogs/${blog._id}/edit`)}
          className="text-sm text-blue-600 hover:text-blue-800 transition"
        >
          ✏️ Edit Blog
        </button>
        <button
          onClick={async () => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this blog?"
            );
            if (!confirmDelete) return;

            try {
              await axios.delete(`${VITE_BACKEND_URL}/api/blogs/${blog._id}`, {
                headers: { Authorization: token },
              });
              alert("Blog deleted successfully");
              navigate("/blogs");
            } catch (err: any) {
              console.error("Error deleting blog:", err);
              alert(err.response?.data?.message || "Failed to delete blog");
            }
          }}
          className="text-sm text-red-600 hover:text-red-800 transition"
        >
          🗑️ Delete Blog
        </button>
      </div>

      <CommentBox
        comments={
          blog.comments
            ?.filter(
              (c) =>
                c &&
                c.user &&
                typeof c.user.username === "string" &&
                typeof c._id === "string"
            )
            .map((c) => ({
              id: c._id,
              user: c.user.username,
              userId: c.user._id,
              text: c.text,
            })) || []
        }
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        currentUser={userId}
      />
    </div>
  );
};

export default BlogDetail;
