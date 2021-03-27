const Pet = require("../models/pet.models");

module.exports.findAllPets = (req, res) => {
    Pet.find()
    .then(allDaPets => res.json({ message:"success", pet: allDaPets }))
    .catch(err => res.json({ message: "error", error: err }));
};

module.exports.findOneSinglePet = (req, res) => {
	Pet.findOne({ _id: req.params.id })
		.then(oneSinglePet => res.json({ message:"success", pet: oneSinglePet }))
		.catch(err => res.json({ message: "error", error: err }));
};

module.exports.createNewPet = (req, res) => {
    Pet.create(req.body)
    .then(newlyCreatedPet => res.json({ message:"success", pet: newlyCreatedPet }))
    .catch(err => res.json({ message: "error", error: err }));
};

module.exports.updateExistingPet = (req, res) => {
    Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators:true })
    .then(updatedPet => res.json({ message:"success", pet: updatedPet }))
    .catch(err => res.json({ message: "error", error: err }));
};

module.exports.updateLikes = (req, res) => {
    Pet.findOneAndUpdate({ _id: req.params.id }, {$inc: {"likes": 1}}, { new: true, runValidators:true })
    .then(updatedPet => res.json({ message:"success", pet: updatedPet }))
    .catch(err => res.json({ message: "error", error: err }));
};

module.exports.deleteAnExistingPet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
    .then(result => res.json({ message:"success", result: result }))
    .catch(err => res.json({ message:"error", message: "Something went wrong", error: err }));
};