const dbConn = require('../../config/db.config');
const bcrypt = require("bcryptjs");

const addUser = (nama, email, password, cb) => {
    const hashedPassword = bcrypt.hashSync(password, 8);
    dbConn.query(
        "INSERT INTO user (nama, email, password) VALUES (?,?,?)",
        [nama, email, hashedPassword],
        (err, result, fields) => {
            cb(err, result);
        }
    );
};

const getUser = cb => {
    dbConn.query("SELECT * FROM user", 
    (err, results, fields) => {
      cb(err, results);
    });
};

module.exports = {
    addUser, 
    getUser
};