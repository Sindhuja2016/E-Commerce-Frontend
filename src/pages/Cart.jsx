import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
       console.log("Cart Response:", response.data);
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cart/${id}`);

      alert("Item removed from cart");

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post("/orders/checkout");

      alert(response.data.message);

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Checkout failed");
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleUpdateQuantity = async (id, quantity) => {
  try {

    await api.put(`/cart/${id}`, {
      quantity
    });

    fetchCart();

  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 bg-gray-100 min-h-screen p-8">

          <h1 className="text-3xl font-bold mb-6">
            🛒 My Cart
          </h1>

          {cartItems.length === 0 ? (

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">

              <h2 className="text-2xl text-gray-500">
                Your cart is empty
              </h2>

            </div>

          ) : (

            <>
              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-lg p-6 mb-5 flex justify-between items-center"
                >

                  <div>

                    <h2 className="text-xl font-bold">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-500">
                      {item.product.category}
                    </p>

                    <p className="mt-2">
                      Price :
                      <span className="font-semibold">
                        ₹ {item.product.price}
                      </span>
                    </p>

                    <p>
                     <div className="flex items-center gap-3 mt-3">

                <button
                   onClick={() =>
                    handleUpdateQuantity(
                         item._id,
                             Math.max(1, item.quantity - 1)) } className="bg-gray-300 px-3 py-1 rounded">
                          -</button>

                      <span className="font-bold">
                    {item.quantity}
                     </span>

  <button
    onClick={() =>
      handleUpdateQuantity(
        item._id,
        item.quantity + 1
      )
    }
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    +
  </button>

</div>
                    </p>

                    <p className="font-bold text-green-600 mt-2">
                      Subtotal :
                      ₹ {item.product.price * item.quantity}
                    </p>

                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded"
                  >
                    <FaTrash />
                  </button>

                </div>

              ))}

              <div className="bg-white rounded-lg shadow-lg p-6">

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-bold">
                    Grand Total
                  </h2>

                  <h2 className="text-2xl font-bold text-green-600">
                    ₹ {total}
                  </h2>

                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
                >
                  Checkout
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    </>
  );
}

export default Cart;