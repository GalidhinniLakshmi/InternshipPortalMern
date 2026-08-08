const express=require("express");

const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const roleMiddleware=require("../middleware/roleMiddleware");

const{

applyInternship,
getMyApplications,
getAllApplications,
updateApplicationStatus,
deleteApplication

}=require("../controllers/applicationController");

// Student Apply

router.post(
"/",
authMiddleware,
roleMiddleware("student"),
applyInternship
);

// Student View Own Applications

router.get(
"/my",
authMiddleware,
roleMiddleware("student"),
getMyApplications
);

// Company/Admin View All Applications

router.get(
"/",
authMiddleware,
roleMiddleware("company","admin"),
getAllApplications
);

// Update Status

router.put(
"/:id",
authMiddleware,
roleMiddleware("company","admin"),
updateApplicationStatus
);

// Delete

router.delete(
"/:id",
authMiddleware,
roleMiddleware("company","admin"),
deleteApplication
);

module.exports=router;