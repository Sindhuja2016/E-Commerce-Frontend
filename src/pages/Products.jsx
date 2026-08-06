import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

 const handleAddToCart = async (product) => {
  try {
    const response = await api.post("/api/cart", {
      productId: product._id,
      quantity: 1,
    });

    alert(response.data.message);
  } catch (error) {
    console.log(error);
    alert("Failed to add product to cart");
  }
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {

    const response = await api.delete(`/api/products/${id}`);

    alert(response.data.message);

    // Refresh products
    const updatedProducts = products.filter(
      (product) => product._id !== id
    );

    setProducts(updatedProducts);

  } catch (error) {
    console.log(error);
    alert("Failed to delete product");
  }
};

  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              Products
            </h1>

            {role === "admin" && (
            <button
             onClick={() => navigate("/products/add")}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                 + Add Product
                </button>
                  )}


          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-200">

                <tr>

                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-center">Actions</th>

                </tr>

              </thead>

            <tbody>

  {products.length === 0 ? (

    <tr>
      <td colSpan="5" className="text-center p-6 text-gray-500">
        No Products Found
      </td>
    </tr>

  ) : (

    products.map((product) => (

      <tr
        key={product._id}
        className="border-b hover:bg-gray-50"
      >

        <td className="p-3">{product.name}</td>

        <td className="p-3">{product.category}</td>

        <td className="p-3">₹ {product.price}</td>

        <td className="p-3">
          {product.stock < 5 ? (
            <span className="text-red-600 font-bold">
              {product.stock} (Low)
            </span>
          ) : (
            product.stock
          )}
        </td>

        <td className="p-3 text-center">

          {role === "admin" ? (

            <>
              <button onClick={() => navigate(`/products/edit/${product._id}`)}
                  className="bg-yellow-400 p-2 rounded mr-2">
               <FaEdit /></button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                <FaTrash />
              </button>
            </>

          ) : (

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 mx-auto"
              onClick={() => handleAddToCart(product)}
            >
              <FaCartPlus />
              Add to Cart
            </button>

          )}

        </td>

      </tr>

    ))

  )}

</tbody>

            </table>

          </div>

        </div>

      </div>

    </>
  );
}

export default Products;