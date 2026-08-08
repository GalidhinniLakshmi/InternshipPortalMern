import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import "./EditInternship.css";
import background from "../assets/internships-bg.jpg";

function EditInternship() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        companyName: "",
        location: "",
        stipend: "",
        duration: "",
        skills: "",
        description: ""
    });

    useEffect(() => {
        fetchInternship();
    }, []);

    const fetchInternship = async () => {

        try {

            const res = await api.get(`/internships/${id}`);

            setFormData({
                title: res.data.title || "",
                companyName: res.data.companyName || "",
                location: res.data.location || "",
                stipend: res.data.stipend || "",
                duration: res.data.duration || "",
                skills: Array.isArray(res.data.skills)
                    ? res.data.skills.join(", ")
                    : res.data.skills || "",
                description: res.data.description || ""
            });

        } catch (error) {

            console.log(error);
            toast.error("Failed to load internship");

        }

    };

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

            await api.put(
                `/internships/${id}`,
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

            toast.success("Internship Updated Successfully");

            navigate("/company/internships");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Update Failed"
            );

        }

    };

    return (

        <div
            className="edit-container"
            style={{
                backgroundImage: `url(${background})`
            }}
        >

            <div className="edit-overlay"></div>

            <div className="edit-content">

                <form
                    className="edit-card"
                    onSubmit={handleSubmit}
                >

                    <h2>✏️ Edit Internship</h2>

                    <p>Update internship information</p>

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
                        type="number"
                        name="stipend"
                        placeholder="Stipend (₹)"
                        value={formData.stipend}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration"
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
                        Update Internship
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditInternship;