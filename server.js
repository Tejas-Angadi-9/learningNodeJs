const app = require('./index')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// dotenv.config({ path: `./config.env` })
console.log(app.get('env'))

dotenv.config();
console.log(process.env.PORT)

mongoose.connect(process.env.DATABASE)
    .then(() => console.log('Connected to database successfully!')) // this should be have a callback function (COMPULSORY)
    .catch((err) => {
        console.log('Failed to connect with DB');
        console.error(err.message);
        process.exit(1)
    })

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}...`);
})
