import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <h2>StockFlow</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/products">Products</Link>
      <Link to="/settings">Settings</Link>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;