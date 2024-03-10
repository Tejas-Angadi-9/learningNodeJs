const mongoose = require('mongoose')

// Creating a new schema and then converting it to model
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour should have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a name']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have an image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [String]
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