const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbConn = require('mysql');

router.post('/', (req, res) => {
    const { email, password } =req.body;
    dbConn.query("SELECT * FROM user WHERE email = ?", [email],
    (err, result, fields) => {
        if(err) {
            res.status(500).send({
                message: 'Error authentication'
            });
        } else if (result.length === 0) {
            res.status(404).send({
                message: 'User not found'
            });
        } else {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, 'secretkey', {
                    expiresIn: 86400
                });
                res.status(200).send({
                    auth: true, token
                });
            } else {
                res.status(401).send({
                    message: 'Wrong password'
                });
            }
        }
    }); 
});

module.exports = router;