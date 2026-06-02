import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api';
function Signup() {
  const [organisationName, setOrganisationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, organisationName )
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { email, password, organisationName });

      localStorage.setItem('token', response.data.token);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign Up
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">
              Organisation Name
            </label>

            <input
              type="text"
              value={organisationName}
              onChange={(e) =>
                setOrganisationName(e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;