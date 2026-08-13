import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Sidebar() {
  const role = localStorage.getItem("role");
  return (
    <div className="w-60 bg-gray-800 text-white min-h-screen p-5">

      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard">🏠 Dashboard</Link>
        </li>

        <li>
          <Link to="/products">📦 Products</Link>
        </li>

        <li>
          <Link to="/orders">🛒 Orders</Link>
        </li>

        <li>
          <Link to="/users">👥 Users</Link>
        </li>
        <li>
          {role === "user" && (
          <Link to="/cart" className="flex items-center gap-3 p-3 rounded hover:bg-blue-700">
          <FaShoppingCart />
           Cart</Link>)}
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;