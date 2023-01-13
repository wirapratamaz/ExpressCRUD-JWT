const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("express");
const bcrypt = require("bcryptjs");
const userRoutes = require('./src/routes/userRoutes')
const authRoutes = require('./src/routes/auth');

const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests content-type - application/json
app.use(bodyParser.json())
// root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require employee routes
const employeeRoutes = require('./src/routes/employeeRoutes.js')
// using as middleware api
app.use('/api/v1/employees', employeeRoutes)
// Require user routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/authenticate', authRoutes);

// listen
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});