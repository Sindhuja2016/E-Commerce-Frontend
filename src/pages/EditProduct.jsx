import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/products/${id}`, product);

      alert("Product updated successfully");

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
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
              Edit Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                rows="4"
              />

              <input
                type="number"
                name="price"
                min="0"
                value={product.price}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="number"
                name="stock"
                min="0"
                value={product.stock}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded"
              >
                Update Product
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default EditProduct;