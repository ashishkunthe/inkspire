import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
