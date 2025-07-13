import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="backdrop-blur-md bg-white/40 border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-md rounded-b-xl">
      <Link
        to="/"
        className="text-2xl font-semibold text-gray-800 tracking-tight"
      >
        Inkspire
      </Link>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            {pathname !== "/create" && (
              <Link
                to="/create"
                className="text-sm font-medium text-gray-700 hover:text-black transition"
              >
                Create
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-gray-800 text-white px-4 py-1.5 rounded hover:bg-gray-900 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-gray-800 text-gray-800 px-4 py-1.5 rounded hover:bg-gray-100 text-sm font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
