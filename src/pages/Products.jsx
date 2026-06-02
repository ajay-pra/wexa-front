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
    <div>
        <Navbar/>
      <h1>Products</h1>

      <button onClick={openCreate}>
        Add Product
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search by name or SKU"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.quantity}</td>
              <td>{product.sellingPrice}</td>
              <td>
                <button
                  onClick={() => openEdit(product)}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div>
          <h2>
            {editingId
              ? 'Edit Product'
              : 'Add Product'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <br />
              <input
                type="text"
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

            <br />

            <div>
              <label>SKU</label>
              <br />
              <input
                type="text"
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

            <br />

            <div>
              <label>Description</label>
              <br />
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                }
              />
            </div>

            <br />

            <div>
              <label>Quantity</label>
              <br />
              <input
                type="number"
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

            <br />

            <div>
              <label>Cost Price</label>
              <br />
              <input
                type="number"
                value={formData.costPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    costPrice: Number(e.target.value)
                  })
                }
              />
            </div>

            <br />

            <div>
              <label>Selling Price</label>
              <br />
              <input
                type="number"
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

            <br />

            <div>
              <label>Low Stock Threshold</label>
              <br />
              <input
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lowStockThreshold: e.target.value
                  })
                }
              />
            </div>

            <br />

            <button type="submit">
              {editingId ? 'Update' : 'Create'}
            </button>

            <button
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Products;