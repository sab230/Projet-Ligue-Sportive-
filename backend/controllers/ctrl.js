const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const userValidation = require('../validation/validation')


exports.inscription = (req, res) => {

    // récupération des données du formulaire

    const { body } = req
    // valider les données 

    const { error } = userValidation(body).userValidationSignUp
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // hash du mot de passe 

    bcrypt.hash(body.password, 10)
        .then(hash => {
            if (!hash) return res.status(500).json({ msg: "Server error" })
            delete body.password

            new user({ ...body, password: hash })
                .save()
                .then((user) => {
                    console.log(user)
                    res.status(201).json({ msg: "User created" })

                })
                .catch((error) => res.status(500).json(error))
        })
        .catch((error) => res.status(500).json(error))
}
exports.connexion = (req, res) => {
    const { email, password } = req.body
    // valider les données  

    const { error } = userValidation(req.body).userValidationLogin
    if (error) {
        return res.status(401).send(error.details[0].message)
    }

    // vérifier si l'utilisateur existe dans la base de données 

    user.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(401).json({ msg: "User not found" })

            // vérifier si le mot de passe est correct, méthode async

            bcrypt.compare(password, user.password)
                .then(match => {
                    console.log("yes")
                    if (!match) return res.status(401).json({ msg: "Incorrect password" })

                    res.status(200).json({
                        email: user.email,
                        id: user._id,
                        token: jwt.sign({ id: user._id }, "Secret_KEY", { expiresIn: "12h" })
                    })
                })
                .catch(error => res.status(500).json(error))
        })
        .catch(error => res.status(500).json(error))

}
