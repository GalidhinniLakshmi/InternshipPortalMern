const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes=require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Protected Route",
        user: req.user
    });

});

app.get("/", (req, res) => {
    res.send("Welcome to Internship Portal API");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});