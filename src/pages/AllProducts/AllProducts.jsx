import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [editProductId, setEditProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://bib-one.vercel.app/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://bib-one.vercel.app/api/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.price || form.price <= 0)
      newErrors.price = "Valid price is required";
    if (!form.quantity || form.quantity < 0)
      newErrors.quantity = "Valid quantity is required";
    if (!form.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the highlighted errors.", {
        toastId: "error",
      });
      return;
    }

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
        imageUrl = uploadResponse.data.imageBuffer;
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
        toast.success("Product updated successfully", {
          toastId: "successfully",
        });
      } else {
        await axios.post(
          "https://bib-one.vercel.app/api/products",
          productData
        );
        toast.success("Product added successfully", {
          toastId: "successfully",
        });
      }
      fetchProducts();
      setForm({
        name: "",
        image: "",
        category: "",
        price: "",
        quantity: "",
      });
      setEditProductId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data", {
        toastId: "error",
      });
    }
  };

  const handleEdit = (product) => {
    setForm({
      ...product,
      image: product.image.replace(/^data:image\/[a-z]+;base64,/, ""),
    });
    setEditProductId(product.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bib-one.vercel.app/api/products/${id}`);
      fetchProducts();
      toast.success("Product deleted successfully", {
        toastId: "successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product", {
        toastId: "error",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[82vh]">
      <ToastContainer />
      <div className="flex items-center justify-between gap-2 mb-4">
        <h1 className="text-xl font-bold text-gray-600">Products List</h1>
        <button
          className="px-4 py-2 text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
          onClick={() => setShowModal(true)}
        >
          Create new
        </button>
      </div>
      <div className="p-4 bg-white border border-gray-200 rounded-lg overflow-x-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg hover:shadow-md duration-200 transition overflow-hidden"
              >
                <div className="h-56">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-base font-semibold text-gray-700 truncate">
                    {product.name}
                  </h4>
                  <p className="text-green-600 font-medium">${product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
                      onClick={() => handleEdit(product)}
                    >
                      <MdEdit />
                      Edit
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-[#3bb77e] hover:text-white hover:border-[#3bb77e] transition"
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
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-600">
              No products available at the moment.
            </h1>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <div className="mb-3">
              <button
                className="absolute top-[2px] right-1  pb-4 text-gray-700"
                onClick={() => setShowModal(false)}
              >
                <IoIosClose className="text-[30px]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className={`w-full p-2 border rounded ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.image && (
                  <span className="text-red-500 text-sm">{errors.image}</span>
                )}
              </div>
              <div>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    {errors.category}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">{errors.price}</span>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.quantity && (
                  <span className="text-red-500 text-sm">
                    {errors.quantity}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-2 text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
              >
                {editProductId ? "Update" : "Add"} Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
