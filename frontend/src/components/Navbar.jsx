import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (

        <nav className={location.pathname === "/" ? "navbar home-navbar" : "navbar"}>

            <div className="logo">
                Internship Portal
            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                {token && user?.role === "student" && (
                    <>
                        <Link to="/internships">Internships</Link>
                        <Link to="/my-applications">My Applications</Link>
                    </>
                )}

                {token && user?.role === "company" && (
                    <>
                        <Link to="/company/dashboard">Dashboard</Link>
                        <Link to="/company/internships">My Internships</Link>
                    </>
                )}

                {token && user?.role === "admin" && (
                    <Link to="/admin/dashboard">Dashboard</Link>
                )}

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">
                            <button className="register-btn">
                                Register
                            </button>
                        </Link>
                    </>
                ) : (
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                )}

            </div>

        </nav>

    );

}

export default Navbar;