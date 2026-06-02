import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import Navbar from '../components/Navbar';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    quantity: 0,
    costPrice: 0,
    sellingPrice: 0,
    lowStockThreshold: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const data = {
        ...formData,
        lowStockThreshold: formData.lowStockThreshold
          ? Number(formData.lowStockThreshold)
          : undefined
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (editingId) {
        await axios.put(
          `${API_URL}/products/${editingId}`,
          data,
          config
        );
      } else {
        await axios.post(
          `${API_URL}/products`,
          data,
          config
        );
      }

      setShowModal(false);
      setEditingId(null);

      setFormData({
        name: '',
        sku: '',
        description: '',
        quantity: 0,
        costPrice: 0,
        sellingPrice: 0,
        lowStockThreshold: ''
      });

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.error ||
        'Error saving product'
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `${API_URL}/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchProducts();
    } catch (error) {
      alert('Error deleting product', error);
    }
  };

  const openEdit = (product) => {
    setFormData({
      name: product.name,
      sku: product.sku,
      description: product.description || '',
      quantity: product.quantity,
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      lowStockThreshold: product.lowStockThreshold || ''
    });

    setEditingId(product._id);
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingId(null);

    setFormData({
      name: '',
      sku: '',
      description: '',
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      lowStockThreshold: ''
    });

    setShowModal(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.sku
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <button
            onClick={openCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-6"
        />

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">SKU</th>
              <th className="border p-3">Quantity</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">
                  {product.name}
                </td>

                <td className="border p-2">
                  {product.sku}
                </td>

                <td className="border p-2">
                  {product.quantity}
                </td>

                <td className="border p-2">
                  ₹{product.sellingPrice}
                </td>

                <td className="border p-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4">
                {editingId
                  ? 'Edit Product'
                  : 'Add Product'}
              </h2>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label>SKU</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sku: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value)
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label>Cost Price</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.costPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      costPrice: Number(e.target.value)
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label>Selling Price</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.sellingPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sellingPrice: Number(e.target.value)
                    })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label>Low Stock Threshold</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.lowStockThreshold}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lowStockThreshold: e.target.value
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                {editingId ? 'Update' : 'Create'}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;