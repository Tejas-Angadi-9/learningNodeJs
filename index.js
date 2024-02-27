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


app.get('/api/v1/tours', (req, res) => {

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    try{

        // const {name, duration, difficulty} = req.body;
        // if(!name || !duration || !difficulty){
    //     return res
    //             .status(400)
    //             .send('Fill all the fields')
    // }

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);

    // writting the updated tours
    // try{
    //     fs.writeFileSync('section_6_express_js/dev-data/data/tours-simple.json', 'utf-8', JSON.parse(tours), err => { 
    //         res.status(201).json({
    //         status: "success",
    //         data: {
    //             tour: newTour
    //         }  
    //         })
    //     })
    //     res.send('Writing done!');  
    // }
    // catch(e){
    //     res
    //         .status(502)
    //         .send('Failed to store the new tour')
    // }


    res
     .status(201)
     .send('Created a new tour')

     console.log("CREATED A NEW TOUR: \n", req.body)
    }
    catch(e){
        res
          .status(500)
          .send('Internal Server error')
        console.log('INTERNAL SERVER ERROR')
    }
})