const app = require('./index')
const dotenv = require('dotenv')


// dotenv.config({ path: `./config.env` })
console.log(app.get('env'))

dotenv.config();
console.log(process.env.MY_USERNAME)

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}...`);
})
