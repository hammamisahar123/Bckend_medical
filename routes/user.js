const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/api/add_user", userController.addUser);
router.get("/api/get_users", userController.getUsers);
router.get("/api/get_user/:_id", userController.getUserById);
router.put("/api/updateUser/:id", userController.updateUser);
router.delete("/api/deleteUser/:id", userController.deleteUser);
router.get("/api/get_user_byEmail/:attribute", userController.getUserByEmail);

module.exports = router;
