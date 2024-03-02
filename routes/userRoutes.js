const express = require('express')
const router = express.Router();

// IMPORTING THE USER CONTROL HANDLERS
const { getAllUsers, createUser, updateUser, getUser, deleteUser } = require('../controllers/userController')

// -------------------------------------- ROUTES ---------------------------------------------- //
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router;