const { connect } = require('mongoose')

function dbConnexion() {
    connect("mongodb+srv://sab-user-1:tAhXF1r4Aw03nAf9@testbdd.m3ptjfz.mongodb.net")
        .then(() => console.log("Je suis connecté à la base de données"))
        .catch(error => console.log(error))
}

module.exports = dbConnexion