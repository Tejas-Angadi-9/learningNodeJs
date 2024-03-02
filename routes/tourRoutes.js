const express = require('express');
const router = express.Router();

// ------------------------------- IMPORTING THE TOUR CONTROLLERS --------------------------------------------- //
const tourController = require('./../controllers/tourController')

// Param Middleware
router.param('id', tourController.checkID)

// or instead of tourController.name we can use object destructering but the name should be same as it was exported

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.postTour)

router
    .route('/:id')
    .get(tourController.getSingleTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router;