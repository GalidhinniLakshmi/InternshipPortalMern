const Internship = require("../models/Internship");

// Create Internship
const createInternship = async (req, res) => {
    try {
        const internship = await Internship.create({
            ...req.body,
            postedBy: req.user.id
        });

        res.status(201).json({
            message: "Internship Posted Successfully",
            internship
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Internships
// Get All Internships (Search + Filter + Pagination + Sorting)

const getAllInternships = async (req, res) => {
    try {

        const {
            title,
            location,
            skills,
            page = 1,
            limit = 5,
            sort = "latest"
        } = req.query;

        let filter = {};

        // Search by Title
        if (title) {
            filter.title = {
                $regex: title,
                $options: "i"
            };
        }

        // Filter by Location
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        // Filter by Skill
        if (skills) {
            filter.skills = {
                $in: [skills]
            };
        }

        // Sorting
        let sortOption = {};

        if (sort === "latest") {
            sortOption = { createdAt: -1 };
        } else if (sort === "stipend") {
            sortOption = { stipend: -1 };
        }

        const internships = await Internship.find(filter)
            .populate("postedBy", "name email")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Internship.countDocuments(filter);

        res.status(200).json({
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            internships
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Internship By ID
const getInternshipById = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship Not Found"
            });
        }

        res.status(200).json(internship);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Internship
const updateInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!internship) {
            return res.status(404).json({
                message: "Internship Not Found"
            });
        }

        res.status(200).json({
            message: "Internship Updated Successfully",
            internship
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Internship
const deleteInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndDelete(req.params.id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship Not Found"
            });
        }

        res.status(200).json({
            message: "Internship Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Get Internships Posted By Logged-in Company

const getCompanyInternships = async (req, res) => {

    try {

        const internships = await Internship.find({
            postedBy: req.user.id
        });

        res.status(200).json(internships);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports = {
    createInternship,
    getAllInternships,
    getInternshipById,
    updateInternship,
    deleteInternship,
    getCompanyInternships
};