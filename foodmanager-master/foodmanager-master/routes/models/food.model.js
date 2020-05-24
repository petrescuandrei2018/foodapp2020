'use strict';
var dbConn = require('../db.config');

var Food = function (food) {
    this.user_id = food.userId;
    this.name = food.name;
    this.description = food.description;
    this.category_id = food.categoryId;
    this.expiration_date = food.expirationDate;
};

Food.create = function (newFood, result) {
    dbConn.query("INSERT INTO foods set ?", newFood, function (err, res) {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, res.inserId)
        }
    });
};

Food.findAll = function (result) {
    dbConn.query("Select * from foods", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('foods : ', res);
            result(null, res);
        }
    });
};

Food.delete = function (id, result) {
    dbConn.query("DELETE FROM foods WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("deleted");
            result(null, res);
        }
    });
};

Food.findById = function (id, result) {
    dbConn.query("Select * from foods where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Food;