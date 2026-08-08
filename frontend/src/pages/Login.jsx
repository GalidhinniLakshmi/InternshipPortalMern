import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import background from "../assets/login-bg.jpg";
import "./Login.css";
import { toast } from "react-toastify";
function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", formData);

         toast.success(response.data.message);

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            const role = response.data.user.role;

            if (role === "student") {
                navigate("/student/dashboard");
            }
            else if (role === "company") {
                navigate("/company/dashboard");
            }
            else {
                navigate("/admin/dashboard");
            }

        } catch (error) {

toast.error(error.response?.data?.message || "Login Failed");
        }

    };

    return (

        <div
            className="login-container"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="overlay"></div>

            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h1>Internship Portal</h1>

                <p>Welcome Back 👋</p>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p className="register-link">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </form>

        </div>

    );

}

export default Login;