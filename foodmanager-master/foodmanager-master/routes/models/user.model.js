'use strict';
var dbConn = require('../db.config');

var User = function (user) {
    this.user_id = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.address = user.address;
};

User.create = function(newUser, result) {
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, res.inserId)
        }
    });
};

User.findAll = function (result) {
    dbConn.query("Select * from users", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      }
      else {
        console.log('users : ', res);
        result(null, res);
      }
    });
  };

module.exports = User;