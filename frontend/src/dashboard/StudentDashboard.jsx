import { Link } from "react-router-dom";
import background from "../assets/dashboard-bg.jpg";
import "./Dashboard.css";

function StudentDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div
            className="dashboard"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="dashboard-overlay"></div>

            <div className="dashboard-content">

                <h1>Student Dashboard</h1>

                <div className="welcome-card">

                    <h2>Welcome, {user.name} 👋</h2>

                    <p>{user.email}</p>

                </div>

                <div className="dashboard-grid">

                    <div className="dashboard-card">

                        <div className="icon">💼</div>

                        <h3>Browse Internships</h3>

                        <p>
                            Explore internships from top companies and apply with one click.
                        </p>

                        <Link to="/internships">
                            <button>Explore</button>
                        </Link>

                    </div>

                    <div className="dashboard-card">

                        <div className="icon">📄</div>

                        <h3>My Applications</h3>

                        <p>
                            Track your applications and check their latest status.
                        </p>

                        <Link to="/my-applications">
                            <button>View</button>
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StudentDashboard;