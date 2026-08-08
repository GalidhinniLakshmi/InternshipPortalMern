const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

const adminDashboard = async (req, res) => {
    try {

        const totalStudents = await User.countDocuments({ role: "student" });

        const totalCompanies = await User.countDocuments({ role: "company" });

        const totalInternships = await Internship.countDocuments();

        const totalApplications = await Application.countDocuments();

        res.status(200).json({
            totalStudents,
            totalCompanies,
            totalInternships,
            totalApplications
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = { adminDashboard };