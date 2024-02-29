const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
PORT = 4000;

// ------------- STARTING THE SERVER --------------
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}...`);
})

// ----------------- ROUTES -----------------------
// Get method
// app.get('/', (req, res) => {
//     res.json([{username: 'Tejasangadi9', name: 'Tejas Angadi'}, {username: 'Tejasangadi9', name: 'Tejas Angadi'}]).status(200);
// })

// // Post method
// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...');
// })

// // Put method
// app.put('/', (req, res) => {
//     res.send('You can put to this endpoint....');
// })

// // Patch method
// app.patch('/', (req, res) => {
//     res.send('You can patch to this endpoint....');
// })

// // Delete method
// app.delete('/', (req, res) => {
//     res.send('You can delete in this endpoint....');
// })

// APP - NATOURS 
app.get('/', (req, res) => {
    res.send('This is the Natours home page');
})

const tours = require('./dev-data/data/tours-simple.json');

// const tours = fs.readFile('./dev-data/data/tours-simple.json',)

// Route Handlers
// Getting all the tours data
const getAllTours = (req, res) => {

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
}

// getting a single tour data based on id
const getSingleTour = (req, res) => {
    const id = req.params.id * 1;

    // if 'id' is greater than array size
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: "Invalid id"
        })
    }

    const tour = tours.find((el) => (
        el.id === id
    ))
    res.send(tour)
}

const postTour = (req, res) => {
    const { name, state, country } = req.body;
    if (!name || !state || !country) {
        return res
            .status(400)
            .send('Fill all the fields')
    }

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
const updateTour = (req, res) => {
    // Getting id
    const id = req.params.id * 1;

    // checking if the id is valid or not
    if (id >= tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'ID not found'
        })
    }

    // As everything is valid we are good to update a tour based on the given id
    res.status(200).json({
        status: 'success',
        data: {
            message: `Updating in tour ${id}`,
            tour: `<Updated tour here...>`
        }
    })
}

// Deleting a tour
const deleteTour = (req, res) => {
    const id = req.params.id * 1;

    if (id >= tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'ID not found'
        })
    }

    res.status(204).json({
        status: 'success',
        message: `Deleted tour with id: ${id}`,
        data: null
    })
}

// Routes
//! app.get('/api/v1/tours', getAllTours)
//! app.get('/api/v1/tours/:id?', getSingleTour)
//! app.post('/api/v1/tours', postTour)
//! app.patch('/api/v1/tours/:id', updateTour)
//! app.delete('/api/v1/tours/:id', deleteTour)

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(postTour)
app
    .route('/api/v1/tours/:id')
    .get(getSingleTour)
    .patch(updateTour)
    .delete(deleteTour)

