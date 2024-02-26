const express = require('express');
const app = express();

app.use(express.json());
PORT = 4000;

// ------------- STARTING THE SERVER --------------
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})
 
// ----------------- ROUTES -----------------------
// Get method
app.get('/', (req, res) => {
    res.json([{username: 'Tejasangadi9', name: 'Tejas Angadi'}, {username: 'Tejasangadi9', name: 'Tejas Angadi'}]).status(200);
})

// Post method
app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
})

// Put method
app.put('/', (req, res) => {
    res.send('You can put to this endpoint....');
})

// Patch method
app.patch('/', (req, res) => {
    res.send('You can patch to this endpoint....');
})

// Delete method
app.delete('/', (req, res) => {
    res.send('You can delete in this endpoint....');
})