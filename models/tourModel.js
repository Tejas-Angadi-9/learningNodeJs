const mongoose = require('mongoose')

// Creating a new schema and then converting it to model
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a name']
    }
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

// incoming data from the user from the req.body
// const testTour = new Tour({
//     name: 'The Forest Hiker',
//     rating: 4.7,
//     price: 497
// });

// DB interaction
// testTour
//     .save()
//     .then((doc) => console.log(doc, 'is saved successfully'))
//     .catch((err) => console.log('Failed to save in DB ', err.message))