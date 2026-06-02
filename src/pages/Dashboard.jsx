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
    return <h2>Loading...</h2>;
  }

  return (
    <div>
        <Navbar />
      <h1>Dashboard</h1>

      <h3>Total Products: {data.totalProducts}</h3>

      <h3>Total Inventory: {data.totalQuantity}</h3>

      <h3>Low Stock Items: {data.lowStockItems.length}</h3>

      <hr />

      <h2>Low Stock Alert</h2>

      {data.lowStockItems.length === 0 ? (
        <p>No low stock items</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {data.lowStockItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;