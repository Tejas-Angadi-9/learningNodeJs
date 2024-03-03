const app = require('./index')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// dotenv.config({ path: `./config.env` })
console.log(app.get('env'))

dotenv.config();
console.log(process.env.PORT)

mongoose.connect(process.env.DATABASE)
    .then(() => console.log('Connected to DB successfully!')) // this should be have a callback function (COMPULSORY)
    .catch((err) => {
        console.log('Failed to connect with DB');
        console.error(err.message);
        process.exit(1)
    })

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

// incoming data from the user from the req.body
const testTour = new Tour({
    name: 'The Forest Hiker',
    rating: 4.7,
    price: 497
});

// DB interaction
testTour
    .save()
    .then((doc) => console.log(doc, 'is saved successfully'))
    .catch((err) => console.log('Failed to save in DB ', err.message))

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}...`);
})
