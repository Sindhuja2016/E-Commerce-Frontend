import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/products/create", product);

      alert(response.data.message);

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 bg-gray-100 min-h-screen p-8">

          <div className="bg-white max-w-xl mx-auto shadow-lg rounded-lg p-8">

            <h1 className="text-3xl font-bold mb-6 text-center">
              Add Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                rows="4"
              />

              <input
                type="number"
                name="price"
                min="0"
                placeholder="Price"
                value={product.price}
                
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="number"
                name="stock"
                 min="0"
                placeholder="Stock"
                value={product.stock}
                
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
              >
                Save Product
              </button>

            </form>

          </div>

        </div>
      </div>
    </>
  );
}

export default AddProduct;