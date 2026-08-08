import { Link } from "react-router-dom";
import background from "../assets/company-bg.jpg";
import "./Dashboard.css";

function CompanyDashboard() {

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

                <h1>🏢 Company Dashboard</h1>

                <div className="welcome-card">

                    <h2>Welcome, {user.name} 👋</h2>

                    <p>{user.email}</p>

                </div>

                <div className="dashboard-grid">

                    <div className="dashboard-card">

                        <div className="icon">➕</div>

                        <h3>Post Internship</h3>

                        <p>
                            Create and publish new internship opportunities.
                        </p>

                        <Link to="/post-internship">
                            <button>Post</button>
                        </Link>

                    </div>

                    <div className="dashboard-card">

                        <div className="icon">💼</div>

                        <h3>My Internships</h3>

                        <p>
                            View, edit and manage your posted internships.
                        </p>

                        <Link to="/company/internships">
                            <button>Manage</button>
                        </Link>

                    </div>

                    <div className="dashboard-card">

                        <div className="icon">📄</div>

                        <h3>Applications</h3>

                        <p>
                            Review student applications and accept or reject them.
                        </p>

                        <Link to="/company/applications">
                            <button>View</button>
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CompanyDashboard;