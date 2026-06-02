import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [data, setData] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    lowStockItems: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API_URL}/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">
              Total Products
            </h3>
            <p className="text-2xl font-bold">
              {data.totalProducts}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">
              Total Inventory
            </h3>
            <p className="text-2xl font-bold">
              {data.totalQuantity}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-gray-500">
              Low Stock Items
            </h3>
            <p className="text-2xl font-bold text-red-500">
              {data.lowStockItems.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Low Stock Alert
          </h2>

          {data.lowStockItems.length === 0 ? (
            <p>No low stock items</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">SKU</th>
                  <th className="border p-2">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {data.lowStockItems.map((item) => (
                  <tr key={item._id}>
                    <td className="border p-2">
                      {item.name}
                    </td>
                    <td className="border p-2">
                      {item.sku}
                    </td>
                    <td className="border p-2 text-red-500">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;