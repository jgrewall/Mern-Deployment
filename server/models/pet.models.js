const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
	name:{
        type: String,
        required:[true, "Pet name is required"],
        minlength:[3, "Pet name must me atleast 3 characters long"]
    },
    type:{
        type: String,
        required:[true, "Pet type is required"],
        minlength:[3, "Pet type must me atleast 3 characters long"]
    },
    description:{
        type: String,
        required:[true, "Pet description is required"],
        minlength:[3, "Pet description must me atleast 3 characters long"]
    },
    skillOne:{
        type: String
    },
    skillTwo:{
        type: String
    },
    skillThree:{
        type: String
    },
    likes:{
        type:Number,
        default:0
    }
},{timestamps: true});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;