
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");

            setUsers(response.data); // <-- because your backend returns an array

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8 bg-gray-100 min-h-screen">

                    <h1 className="text-3xl font-bold mb-6">
                        Users
                    </h1>

                    <table className="w-full bg-white shadow rounded">

                        <thead className="bg-gray-200">

                            <tr>

                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Joined</th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-b text-center"
                                >

                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                    <td className="p-3">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </>
    );
}

export default Users;