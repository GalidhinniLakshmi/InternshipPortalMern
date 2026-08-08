const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createInternship,
    getAllInternships,
    getInternshipById,
    updateInternship,
    deleteInternship,
    getCompanyInternships
} = require("../controllers/internshipController");

router.post("/", authMiddleware, roleMiddleware("company"), createInternship);

router.get(
    "/company/my",
    authMiddleware,
    roleMiddleware("company"),
    getCompanyInternships
);


router.get("/", getAllInternships);


router.get("/:id", getInternshipById);

router.put("/:id", authMiddleware, roleMiddleware("company"), updateInternship);

router.delete("/:id", authMiddleware, roleMiddleware("company"), deleteInternship);

module.exports = router;