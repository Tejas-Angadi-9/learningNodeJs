const tours = require('../dev-data/data/tours-simple.json');

// PARAM MIDDLEWARE
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`)
    const id = req.params.id * 1;

    // if 'id' is greater than array size
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: "Invalid id"
        })
    }
    next();
}

exports.checkEntry = (req, res, next) => {
    const { name, state, country } = req.body;
    if (!name || !state || !country) {
        return res
            .status(400)
            .send('Fill all the fields')
    }
    next();
}

// -------------------------------------- ROUTE-HANDLERS ---------------------------------------------- //
// Getting all the tours data
exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        createdBy: res.firstName + lastName,
        results: tours.length,
        data: {
            tours
        }
    })
}


// Route handlers for TOURS
// getting a single tour data based on id
exports.getSingleTour = (req, res) => {

    const tour = tours.find((el) => (
        el.id === req.params.id * 1
    ))
    res.send(tour)
}

exports.postTour = (req, res) => {


    const newId = tours[tours.length - 1].id + 1;
    // const { name, state, country } = req.body;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

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
        .send(tours)
    console.log('Created the new entry')
}

// Updating a single tour
exports.updateTour = (req, res) => {

    // As everything is valid we are good to update a tour based on the given id
    res.status(200).json({
        status: 'success',
        data: {
            message: `Updating in tour ${req.params.id * 1}`,
            tour: `<Updated tour here...>`
        }
    })
}

// Deleting a tour
exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        message: `Deleted tour with id: ${req.params.id * 1}`,
        data: null
    })
}