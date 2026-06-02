import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-indigo-600">
        StockFlow
      </h2>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-indigo-600"
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          className="text-gray-700 hover:text-indigo-600"
        >
          Products
        </Link>

        <Link
          to="/settings"
          className="text-gray-700 hover:text-indigo-600"
        >
          Settings
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;