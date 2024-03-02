const express = require('express');
// const fs = require('fs');
const app = express();
const morgan = require('morgan')

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware 1');
    next();
})

app.use((req, res, next) => {
    console.log("Hey hi there from 2nd middleware")
    next();
})

// ------------- STARTING THE SERVER --------------
// PORT = 4000;
// app.listen(PORT, () => {
//     console.log(`Server running at port ${PORT}...`);
// })

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

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    res.firstName = "Tejas";
    lastName = "Angadi",            // THIS IS NOT PREFERED AS WE NEED TO USE REQ/RES
        next();
})

app.use(morgan('dev'))

// const tours = fs.readFile('./dev-data/data/tours-simple.json',)

// Route handlers for USERS
// Getting all the details of the users


// Routes
//! app.get('/api/v1/tours', getAllTours)
//! app.get('/api/v1/tours/:id?', getSingleTour)
//! app.post('/api/v1/tours', postTour)
//! app.patch('/api/v1/tours/:id', updateTour)
//! app.delete('/api/v1/tours/:id', deleteTour)

// Creating and Mounting to a router
// connecting tourRouter to a common link

// import the router from routes folder
const tourRouter = require('./routes/tourRoutes')
app.use('/api/v1/tours', tourRouter);


const userRouter = require('./routes/userRoutes')
app.use('/api/v1/users', userRouter)

module.exports = app;