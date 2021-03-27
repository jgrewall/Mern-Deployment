const PetController = require("../controller/pet.controller"); // take off Pet if not call Pet.controller

module.exports = app => {
    app.get("/api/pets/", PetController.findAllPets);
    app.get("/api/pets/:id", PetController.findOneSinglePet);
    app.put("/api/pets/update/:id", PetController.updateExistingPet);
    app.put("/api/pets/inc/:id", PetController.updateLikes);
    app.post("/api/pets/new", PetController.createNewPet);
    app.delete("/api/pets/delete/:id", PetController.deleteAnExistingPet);
};