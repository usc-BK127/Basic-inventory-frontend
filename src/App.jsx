import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import axios from "axios";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "Automobiles",
    price: "",
    quantity: "",
  });
  const [editProductId, setEditProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://bib-one.vercel.app/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;

      if (form.image && form.image instanceof File) {
        const formData = new FormData();
        formData.append("file", form.image);

        const uploadResponse = await axios.post(
          "https://bib-one.vercel.app/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = uploadResponse.data.imageUrl;
      }

      const productData = {
        ...form,
        image: imageUrl,
      };

      if (editProductId) {
        await axios.put(
          `https://bib-one.vercel.app/api/products/${editProductId}`,
          productData
        );
      } else {
        await axios.post(
          "https://bib-one.vercel.app/api/products",
          productData
        );
      }
      fetchProducts();
      setForm({
        name: "",
        image: "",
        category: "Automobiles",
        price: "",
        quantity: "",
      });
      setEditProductId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditProductId(product.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bib-one.vercel.app/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <div className="products-section">
        <div className="btn-head">
          <button className="btn-export">Export</button>
          <button className="btn-create" onClick={() => setShowModal(true)}>
            Create new
          </button>
        </div>
        <div className="products">
          <div className="products__container">
            {products.map((product) => (
              <div key={product.id} className="product">
                <div className="product__image">
                  <img
                    src={`http://localhost:3001${product.image}`}
                    alt={product.name}
                    style={{ width: "286px", height: "280px" }}
                  />
                </div>

                <div className="product__content">
                  <div>
                    <h4 className="title">{product.name}</h4>
                    <p className="price">${product.price}</p>
                  </div>
                  <div className="button">
                    <button
                      className="edit btn"
                      onClick={() => handleEdit(product)}
                    >
                      <MdEdit />
                      Edit
                    </button>
                    <button
                      className="delete btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      <MdDelete />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal__item">
              <div className="close-btn">
                <div className="close" onClick={() => setShowModal(false)}>
                  <IoIosClose />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="input-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="input"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="input"
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="Automobiles">Automobiles</option>
                  <option value="Home items">Home items</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Sport items">Sport items</option>
                  <option value="Baby and Toys">Baby and Toys</option>
                </select>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="input"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={handleInputChange}
                  className="input"
                />
                <button type="submit" className="btn-submit">
                  {editProductId ? "Update" : "Add"} Product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
