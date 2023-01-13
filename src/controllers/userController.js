const userModel = require('../models/userModel');

exports.addUser = (req, res) => {
    const { nama, email, password } = req.body;
    userModel.addUser(nama, email, password, (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Error adding user' });
        } else {
            res.status(200).send({ message: 'user added successfully' });
        }
    });
};

exports.getUser = (req, res) => {
    userModel.getUser((err, results) => {
        if (err) {
            res.status(500).send({ message: 'Error getting user' });
        } else {
            res.status(200).send({ user: results });
        }
    });
};