import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/blogs");
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#f8f9fa] text-center px-6">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-gray-600">Inkspire</span>
      </h1>
      <p className="text-lg text-gray-500 max-w-xl mb-8">
        A minimalist blogging platform built for expression. Share your
        thoughts, stories, and ideas with the world.
      </p>
      <button
        onClick={() => navigate("/blogs")}
        className="bg-gray-800 hover:bg-gray-900 text-white text-lg px-8 py-3 rounded-full transition shadow-md"
      >
        Let&apos;s Start
      </button>
    </div>
  );
};

export default Welcome;
