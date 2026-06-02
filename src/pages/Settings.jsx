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
      console.log(error);
      setMessage('Error saving settings');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          Settings
        </h1>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Default Low Stock Threshold
            </label>

            <input
              type="number"
              value={threshold}
              onChange={(e) =>
                setThreshold(Number(e.target.value))
              }
              className="w-full border rounded p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save Settings
          </button>

          {message && (
            <p className="mt-4 text-sm">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Settings;