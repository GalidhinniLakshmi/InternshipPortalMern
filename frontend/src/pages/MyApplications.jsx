import { useEffect, useState } from "react";
import api from "../services/api";
import background from "../assets/applications-bg.jpg";
import "./MyApplications.css";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div
            className="myapps-container"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="myapps-overlay"></div>

            <div className="myapps-content">

                <h1 className="myapps-title">
                    📄 My Applications
                </h1>

                <div className="application-grid">

                    {applications.map((app) => (

                        <div
                            className="application-card"
                            key={app._id}
                        >

                            <h2>{app.internship.title}</h2>

                            <p>
                                🏢 <strong>Company:</strong> {app.internship.companyName}
                            </p>

                            <p>
                                📍 <strong>Location:</strong> {app.internship.location}
                            </p>

                            <p>
                                💰 <strong>Stipend:</strong> ₹{app.internship.stipend}
                            </p>

                            <p>
                                ⏳ <strong>Duration:</strong> {app.internship.duration}
                            </p>

                            <span
                                className={`status ${app.status.toLowerCase()}`}
                            >
                                {app.status}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default MyApplications;