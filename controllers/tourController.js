const tours = require('../dev-data/data/tours-simple.json');

// importing the tour model
const tourModel = require('../models/tourModel');

// PARAM MIDDLEWARE
// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`)
//     const id = req.params.id * 1;

//     // if 'id' is greater than array size
//     if (id > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: "Invalid id"
//         })
//     }
//     next();
// }

// exports.checkEntry = (req, res, next) => {
//     const { name, state, country } = req.body;
//     if (!name || !state || !country) {
//         return res
//             .status(400)
//             .send('Fill all the fields')
//     }
//     next();
// }

// -------------------------------------- ROUTE-HANDLERS ---------------------------------------------- //
// Getting all the tours data
exports.getAllTours = async (req, res) => {
    try {
        // const { duration, difficulty } = req.query;
        // console.log(duration + " " + difficulty);

        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))
        console.log(req.query, queryObj)
        // const tours = await tourModel.find({ duration: duration, difficulty: difficulty });
        const query = tourModel.find(JSON.parse(queryStr));
        const tours = await query;

        // if (duration && difficulty) {
        // const filteredTour = await tourModel.find({ duration: duration, difficulty: difficulty })

        // Alternate way to do this
        // const filteredTour = await tourModel.find().where('duration').equals(5).gt(5).where('difficulty').equals('easy');

        // if (filteredTour.length === 0) {
        //     return res.status(404).json({
        //         status: 'fail',
        //         message: 'Filtered content not found'
        //     })
        // }

        // return res.status(200).json({
        //     status: "success",
        //     // requestedAt: req.requestTime,
        //     // createdBy: res.firstName + lastName,
        //     results: filteredTour.length,
        //     data: {
        //         status: 'success',
        //         filteredTour
        //     }
        // })
        // }

        if (tours.length === 0) {
            return res.status(200).send('No tours available')
        }
        console.log(req.requestTime)
        res.status(200).json({
            status: "success",
            // requestedAt: req.requestTime,
            // createdBy: res.firstName + lastName,
            results: tours.length,
            data: {
                tours
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            data: 'Failed to fetch the tours data',
            message: err.message
        })
    }
}


// Route handlers for TOURS
// getting a single tour data based on id
exports.getSingleTour = async (req, res) => {

    // const tour = tours.find((el) => (
    //     el.id === req.params.id * 1
    // ))
    // res.send(tour)
    try {
        const value = req.params.id * 1;
        const singleTour = await tourModel.find({ id: req.params.id })

        if (singleTour.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No Tour found!'
            })
        }
        res.status(200).json({
            status: 'success',
            data: singleTour
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            data: `Failed to fetch the details about: ${req.params.id}`,
            message: err.message
        })
    }
}

exports.postTour = async (req, res) => {
    try {
        // // const { name, state, country } = req.body;
        // const newTour = Object.assign({ id: newId }, req.body);
        // // tours.push(newTour);
        // const nayaTour = await tourModel.create(newTour);
        // console.log(tourModel);
        const newTour = await tourModel.create(req.body)
        console.log(newTour)

        // writting the updated tours
        // fs.writeFile('section_6_express_js/dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        //     res.status(201).json({
        //         status: "success",
        //         data: {
        //             tour: newTour
        //         }
        //     })
        // })

        res
            .status(201)
            .send(newTour)
        console.log('Created the new entry')
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            data: `Failed to create a new tour`,
            message: err.message
        })
    }
}

// Updating a single tour
exports.updateTour = async (req, res) => {
    try {
        // As everything is valid we are good to update a tour based on the given id
        const tour = await tourModel.findOneAndUpdate({ id: req.params.id * 1 }, req.body, {
            new: true,
            runValidators: true
        })

        if (!tour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tour not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                message: `Updating in tour ${req.params.id * 1}`,
                tour
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            data: 'Failed to update a tour',
            message: err.message
        })
    }
}

// Deleting a tour
exports.deleteTour = async (req, res) => {
    try {
        const tour = await tourModel.findOneAndDelete({ id: req.params.id * 1 })

        if (!tour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tour not found'
            })
        }
        res.status(204).json({
            status: 'success',
            message: `Deleted tour with id: ${req.params.id * 1}`,
            data: tour
        })
    }
    catch (err) {
        console.log('Failed to delete a tour', err.message)
        res.status(500).send('Failed to delete a tour')
    }
}