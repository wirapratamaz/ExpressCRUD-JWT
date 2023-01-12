'use strict';
var dbConn = require('../../config/db.config');
//Employee object create
var Employee = function(employee){
  this.nama            = employee.nama;
  this.email           = employee.email;
  this.telp            = employee.telp;
  this.role            = employee.role;
  this.created_at      = new Date();
  this.updated_at      = new Date();
};
Employee.create = function (newEmp, result) {
    dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(err, null);
    }
    else{
        console.log(res.insertId);
        result(null, res.insertId);
    }});
};

Employee.findById = function (id, result) {
    dbConn.query("Select * from employees where id = ? ", id, function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(err, null);
    }
    else{
        result(null, res);
    }});
};
Employee.findAll = function (result) {
    dbConn.query("Select * from employees", function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(null, err);
    }
    else{
        console.log('employees : ', res);
        result(null, res);
    }});
};
Employee.update = function(id, employee, result){
    dbConn.query("UPDATE employees SET nama=?,email=?,telp=?,role=? WHERE id = ?", [employee.nama,employee.email,employee.telp,employee.role, id], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(null, err);
    }else{
        result(null, res);
    }});
};
Employee.delete = function(id, result){
    dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(null, err);
    }
        else{
        result(null, res);
    }});
};
module.exports= Employee;