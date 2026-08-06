import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/orders/myorders");
      setOrders(response.data.orders);
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
            📦 My Orders
          </h1>

          {orders.length === 0 ? (

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">

              <h2 className="text-2xl text-gray-500">
                No Orders Found
              </h2>

            </div>

          ) : (

            <div className="space-y-5">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-xl font-bold">
                        Order ID
                      </h2>

                      <p className="text-gray-500">
                        {order._id}
                      </p>

                    </div>

                    <div className="text-right">

                      <h2 className="font-semibold">
                        Status
                      </h2>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {order.status}
                      </span>

                    </div>

                  </div>

                  <hr className="my-4" />

                  <h3 className="font-semibold mb-3">
                    Products
                  </h3>

                  {order.products.map((item, index) => (

                    <div
                      key={index}
                      className="flex justify-between mb-2"
                    >

                      <p>
                        {item.product?.name || "Product"}
                      </p>

                      <p>
                        Qty : {item.quantity}
                      </p>

                    </div>

                  ))}

                  <hr className="my-4" />

                  <div className="flex justify-between">

                    <h2 className="font-bold">
                      Total Price
                    </h2>

                    <h2 className="text-green-600 font-bold">
                      ₹ {order.totalPrice}
                    </h2>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </>
  );
}

export default Orders;