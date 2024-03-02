const users = require('../dev-data/data/users.json')

// -------------------------------------- ROUTE-HANDLERS ---------------------------------------------- //
exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        users
    })
}

exports.createUser = (req, res) => {
    res.status(500).json({
        message: 'Still need to implement the logic to create an user'
    })
}

exports.updateUser = (req, res) => {
    res.status(500).json({
        message: 'Still need to implement the logic to update an user'
    })
}

exports.getUser = (req, res) => {
    res.status(500).json({
        message: 'Still need to implement the logic to get a single user'
    })
}

exports.deleteUser = (req, res) => {
    res.status(500).json({
        message: 'Still need to implement the logic to delete an user'
    })
}