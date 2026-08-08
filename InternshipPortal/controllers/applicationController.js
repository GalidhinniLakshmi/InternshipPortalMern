const Application = require("../models/Application");
const Internship = require("../models/Internship");
//Apply Internship
const applyInternship = async(req,res)=>{

try{

const {internship,resume,coverLetter}=req.body;

// Check Internship Exists

const internshipData=await Internship.findById(internship);

if(!internshipData){

return res.status(404).json({
message:"Internship not found"
});

}

// Prevent duplicate application

const alreadyApplied=await Application.findOne({

internship,
student:req.user.id

});

if(alreadyApplied){

return res.status(400).json({
message:"You have already applied for this internship"
});

}

const application=await Application.create({

internship,
student:req.user.id,
resume,
coverLetter

});

res.status(201).json({

message:"Application Submitted Successfully",
application

});

}
catch(error){

res.status(500).json({
message:error.message
});

}
};
//getMyApplications
const getMyApplications=async(req,res)=>{

try{

const applications=await Application.find({

student:req.user.id

})

.populate("internship")

.populate("student","name email");

res.status(200).json(applications);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};
//view all applications(admin)
// View Applications
const getAllApplications = async (req, res) => {

    try {

        let applications;

        // Admin can see all applications
        if (req.user.role === "admin") {

            applications = await Application.find()
                .populate("student", "name email")
                .populate("internship", "title companyName");

        } else {

            // Company sees only applications for its internships
            applications = await Application.find()
                .populate("student", "name email")
                .populate({
                    path: "internship",
                    match: {
                        postedBy: req.user.id
                    }
                });

            // Remove applications whose internship doesn't belong to this company
            applications = applications.filter(app => app.internship);
        }

        res.status(200).json(applications);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
//update status
const updateApplicationStatus=async(req,res)=>{

try{

const application=await Application.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
},

{
new:true
}

);

if(!application){

return res.status(404).json({

message:"Application not found"

});

}

res.status(200).json({

message:"Status Updated",

application

});

}
catch(error){

res.status(500).json({

message:error.message

});

}

};
//Delete Application
const deleteApplication=async(req,res)=>{

try{

const application=await Application.findByIdAndDelete(req.params.id);

if(!application){

return res.status(404).json({

message:"Application not found"

});

}

res.status(200).json({

message:"Application Deleted"

});

}
catch(error){

res.status(500).json({

message:error.message

});

}

};
module.exports={

applyInternship,
getMyApplications,
getAllApplications,
updateApplicationStatus,
deleteApplication

};