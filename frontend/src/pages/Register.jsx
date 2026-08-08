import { useState } from "react";
import "./Register.css";
import background from "../assets/login-bg.jpg";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "student"
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/register", formData);

            toast.success(response.data.message);

            navigate("/login");

        } catch (error) {

            toast.error(error.response?.data?.message || "Registartion Failed");
        }

    };

    return (

    <div
        className="register-container"
        style={{
            backgroundImage: `url(${background})`
        }}
    >

        <div className="overlay"></div>

        <form
            className="register-card"
            onSubmit={handleSubmit}
        >

            <h1>Internship Portal</h1>

            <p>Create Your Account</p>

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="student">Student</option>
                <option value="company">Company</option>
                <option value="admin">Admin</option>
            </select>

            <button type="submit">
                Register
            </button>

            <p className="login-link">
                Already have an account?
                <Link to="/login"> Login</Link>
            </p>

        </form>

    </div>

);

}

export default Register;