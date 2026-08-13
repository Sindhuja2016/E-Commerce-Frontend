import {useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CustomerCard from "../components/CustomerCard";
import Navbar from "../components/Navbar";
import {useEffect, useState} from "react";
import api from "../services/api";
import { FaShoppingCart } from "react-icons/fa";
function Dashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const name = localStorage.getItem("name") || "User";



useEffect(() => {

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/myorders");
      console.log(JSON.stringify(response.data, null, 2));
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
   try {
    const response = await api.get("/users");
    console.log("Users Count:", response.data); 
    setUsers(response.data);
    } catch (error) {
        console.log(error); 
   }
}

 
  fetchProducts();
  fetchOrders();
  fetchUsers();

}, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        navigate("/");
    }

    console.log("Products:", products.length);
console.log("Orders:", orders.length);
console.log("Users:", users.length);

    return (

     <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold mb-6">
            Welcome {name} 👋
          </h1>

          <div className="grid grid-cols-3 gap-6">

            <CustomerCard
              title="Products"
              value={products.length}
            />

            <CustomerCard
              title="Orders"
              value={orders.length}
            />

            <CustomerCard
              title="Users"
              value={users.length}
            />

          </div>

        </div>

      </div>
       <div className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700">
            <button onClick={handleLogout}>Logout</button>
        </div>
    </>
       
    )
}   

export default Dashboard;