// UserAdminPage.jsx
import { useState, useEffect } from "react";
import NavMidComponent from "../component/NavMidComponent";
import RegisterPage from "./RegisterPage";
import AdminUserTable from "../component/AdminUserTable";
import axios from "axios";
import { base } from "../api";

const UserAdminPage = () => {
    const [users, setUsers] = useState([]);
    const baseURL = base;

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No hay token disponible");
            return;
        }
        try {
            const response = await axios.get(`${baseURL}/user/dir/allusernames`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return ( 
        <>
            {/* <NavMidComponent /> */}
            <RegisterPage onRegister={fetchUsers} />
            <AdminUserTable users={users} setUsers={setUsers} />
        </>
    );
}
 
export default UserAdminPage;
