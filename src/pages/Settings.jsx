import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import Navbar from '../components/Navbar';

function Settings() {
  const [threshold, setThreshold] = useState(5);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API_URL}/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        setThreshold(response.data.defaultLowStockThreshold);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `${API_URL}/settings`,
        {
          defaultLowStockThreshold: threshold
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage('Settings saved successfully');
    } catch (error) {
      setMessage('Error saving settings', error);
    }
  };

  return (
    <div>
        <Navbar />

      <h1>Settings</h1>

      <form onSubmit={handleSave}>
        <div>
          <label>Default Low Stock Threshold</label>

          <input
            type="number"
            value={threshold}
            onChange={(e) =>
              setThreshold(Number(e.target.value))
            }
          />
        </div>

        <br />

        <button type="submit">
          Save
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Settings;