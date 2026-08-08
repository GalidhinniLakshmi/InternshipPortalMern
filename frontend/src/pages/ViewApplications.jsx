import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import background from "../assets/applications-bg.jpg";
import "./ViewApplications.css";

function ViewApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/applications", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setApplications(res.data);

        } catch (error) {

            console.log(error);
            toast.error("Failed to load applications");

        }

    };

    const updateStatus = async (id, status) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/applications/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(`Application ${status}`);
            fetchApplications();

        } catch (error) {

            console.log(error);
            toast.error("Failed to update application");

        }

    };

    return (

        <div
            className="viewapps-container"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="viewapps-overlay"></div>

            <div className="viewapps-content">

                <h1 className="viewapps-title">
                    📄 Student Applications
                </h1>

                {
                    applications.length === 0 ?

                        <h2 className="empty">
                            No Applications Found
                        </h2>

                        :

                        <div className="application-grid">

                            {
                                applications.map((app) => (

                                    <div
                                        className="application-card"
                                        key={app._id}
                                    >

                                        <h2>👤 {app.student?.name}</h2>

                                        <p>
                                            📧 <strong>Email:</strong> {app.student?.email}
                                        </p>

                                        <p>
                                            💼 <strong>Internship:</strong> {app.internship?.title}
                                        </p>

                                        <p>
                                            🏢 <strong>Company:</strong> {app.internship?.companyName}
                                        </p>

                                        <span
                                            className={`status ${app.status.toLowerCase()}`}
                                        >
                                            {app.status}
                                        </span>

                                        <div className="button-group">

                                            <button
                                                className="accept-btn"
                                                onClick={() => updateStatus(app._id, "Accepted")}
                                            >
                                                ✅ Accept
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() => updateStatus(app._id, "Rejected")}
                                            >
                                                ❌ Reject
                                            </button>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                }

            </div>

        </div>

    );

}

export default ViewApplications;