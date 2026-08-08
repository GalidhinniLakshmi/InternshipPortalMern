import { useEffect, useState } from "react";
import api from "../services/api";
import "./Internships.css";
import { toast } from "react-toastify";
import background from "../assets/internships-bg.jpg";

function Internships() {

    const [internships, setInternships] = useState([]);

    useEffect(() => {
        getInternships();
    }, []);

    const getInternships = async () => {

        try {

            const response = await api.get("/internships");
            setInternships(response.data.internships);

        } catch (error) {
            console.log(error);
        }

    };

    const applyInternship = async (internshipId) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/applications",
                {
                    internship: internshipId,
                    resume: "https://example.com/resume.pdf",
                    coverLetter: "I am interested in this internship."
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Application Failed"
            );

        }

    };

    return (

        <div
            className="internships-container"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="overlay"></div>

            <div className="internships-content">

                <h1 className="page-title">
                    💼 Available Internships
                </h1>

                <div className="internship-grid">

                    {
                        internships.map((item) => (

                            <div
                                className="internship-card"
                                key={item._id}
                            >

                                <h2>{item.title}</h2>

                                <p>🏢 <strong>Company:</strong> {item.companyName}</p>

                                <p>📍 <strong>Location:</strong> {item.location}</p>

                                <p>💰 <strong>Stipend:</strong> ₹{item.stipend}</p>

                                <p>⏳ <strong>Duration:</strong> {item.duration}</p>

                                <p>{item.description}</p>

                                <div className="skills">

                                    {
                                        item.skills.map((skill, index) => (

                                            <span
                                                key={index}
                                                className="skill"
                                            >
                                                {skill}
                                            </span>

                                        ))
                                    }

                                </div>

                                <button
                                    className="apply-btn"
                                    onClick={() => applyInternship(item._id)}
                                >
                                    🚀 Apply Now
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default Internships;