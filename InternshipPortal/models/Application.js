const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    internship:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Internship",
        required:true
    },

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    resume:{
        type:String,
        required:true
    },

    coverLetter:{
        type:String
    },

    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Application",applicationSchema);