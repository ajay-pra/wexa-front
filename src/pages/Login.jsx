import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    //   localStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data.token));

      navigate('/');
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Do not have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;