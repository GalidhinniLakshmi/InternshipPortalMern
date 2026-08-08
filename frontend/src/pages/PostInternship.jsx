import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import background from "../assets/login-bg.jpg";
import "./PostInternship.css";

const PostInternship = () => {

    const [formData, setFormData] = useState({
        title: "",
        companyName: "",
        location: "",
        stipend: "",
        duration: "",
        skills: "",
        description: ""
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

            const token = localStorage.getItem("token");

            await api.post(
                "/internships",
                {
                    ...formData,
                    skills: formData.skills
                        .split(",")
                        .map(skill => skill.trim())
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Internship Posted Successfully");

            setFormData({
                title: "",
                companyName: "",
                location: "",
                stipend: "",
                duration: "",
                skills: "",
                description: ""
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to post internship"
            );

        }
    };

    return (

        <div
            className="post-container"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="post-overlay"></div>

            <div className="post-content">

                <form
                    className="post-card"
                    onSubmit={handleSubmit}
                >

                    <h2>🚀 Post Internship</h2>

                    <p>Create a new internship opportunity</p>

                    <input
                        type="text"
                        name="title"
                        placeholder="Internship Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="stipend"
                        placeholder="Stipend (₹)"
                        value={formData.stipend}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration (e.g. 3 Months)"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="skills"
                        placeholder="React, Node.js, MongoDB"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        rows="5"
                        name="description"
                        placeholder="Internship Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Post Internship
                    </button>

                </form>

            </div>

        </div>

    );
};

export default PostInternship;