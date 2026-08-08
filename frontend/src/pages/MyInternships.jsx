import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import background from "../assets/internships-bg.jpg";
import "./MyInternships.css";

const MyInternships = () => {

    const [internships, setInternships] = useState([]);

    useEffect(() => {
        fetchMyInternships();
    }, []);

    const fetchMyInternships = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:3000/api/internships/company/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setInternships(res.data);

        } catch (err) {

            console.error(err);
            toast.error("Unable to load internships");

        }

    };

    const deleteInternship = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:3000/api/internships/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Internship deleted");

            fetchMyInternships();

        } catch (err) {

            console.error(err);
            toast.error("Delete failed");

        }

    };

    return (

        <div
            className="myinternships-container"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="myinternships-overlay"></div>

            <div className="myinternships-content">

                <h1 className="myinternships-title">
                    💼 My Internships
                </h1>

                {
                    internships.length === 0 ?

                        <h2 className="empty-message">
                            No Internships Posted Yet
                        </h2>

                        :

                        <div className="internship-grid">

                            {
                                internships.map((item) => (

                                    <div
                                        className="internship-card"
                                        key={item._id}
                                    >

                                        <h2>{item.title}</h2>

                                        <p>
                                            🏢 <strong>Company:</strong> {item.companyName}
                                        </p>

                                        <p>
                                            📍 <strong>Location:</strong> {item.location}
                                        </p>

                                        <p>
                                            💰 <strong>Stipend:</strong> ₹{item.stipend}
                                        </p>

                                        <p>
                                            ⏳ <strong>Duration:</strong> {item.duration}
                                        </p>

                                        <div className="button-group">

                                            <Link
                                                to={`/company/edit/${item._id}`}
                                                style={{ flex: 1 }}
                                            >
                                                <button className="edit-btn">
                                                    ✏️ Edit
                                                </button>
                                            </Link>

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteInternship(item._id)}
                                            >
                                                🗑️ Delete
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

};

export default MyInternships;