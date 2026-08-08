const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        companyName: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        stipend: {
            type: Number,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        skills: {
            type: [String],
            required: true
        },

        description: {
            type: String,
            required: true
        },

        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Internship", internshipSchema);