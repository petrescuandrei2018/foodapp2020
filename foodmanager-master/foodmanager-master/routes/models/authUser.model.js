'use strict';
var dbConn = require('../db.config');

var Authuser = function (user) {
    this.username = user.username;
    this.password = user.password;
};

Authuser.create = function(newUser, result) {
    dbConn.query("INSERT INTO auth_users set ?", newUser, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, res.inserId)
        }
    });
};

module.exports = Authuser;