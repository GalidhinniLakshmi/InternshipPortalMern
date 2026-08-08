import { useEffect, useState } from "react";
import api from "../services/api";
import background from "../assets/admin-bg.jpg";
import "./Dashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        totalInternships: 0,
        totalApplications: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/dashboard/admin", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Dashboard Data:", res.data);

            setStats(res.data);
            console.log("Students:", res.data.totalStudents);
console.log("Companies:", res.data.totalCompanies);
console.log("Internships:", res.data.totalInternships);
console.log("Applications:", res.data.totalApplications);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to load dashboard"
            );

        }

    };

    return (

        <div
            className="dashboard"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="dashboard-overlay"></div>

            <div className="dashboard-content">

                <h1>👑 Admin Dashboard</h1>

                <div className="welcome-card">

                    <h2>Welcome Administrator 👋</h2>

                    <p>Manage the Internship Portal Efficiently</p>

                </div>

                <div className="dashboard-grid">

                    <div className="dashboard-card">

                        <div className="icon">🎓</div>

                        <h3>Total Students</h3>

                        <h2>{stats.totalStudents}</h2>

                    </div>

                    <div className="dashboard-card">

                        <div className="icon">🏢</div>

                        <h3>Total Companies</h3>

                        <h2>{stats.totalCompanies}</h2>

                    </div>

                    <div className="dashboard-card">

                        <div className="icon">💼</div>

                        <h3>Total Internships</h3>

                        <h2>{stats.totalInternships}</h2>

                    </div>

                    <div className="dashboard-card">

                        <div className="icon">📝</div>

                        <h3>Total Applications</h3>

                        <h2>{stats.totalApplications}</h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;