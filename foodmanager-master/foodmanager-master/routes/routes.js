const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const usersFilePath = path.join(__dirname, './users.json');
const foodsFilePath = path.join(__dirname, './foods.json');
const foodCategoriesFilePath = path.join(__dirname, './food-categories.json');
const Authuser = require('./models/authUser.model');
const Food = require('./models/food.model');
const User = require('./models/user.model');
var dbConn = require('./db.config');
//Get all users 
router.get('/users', async function (req, res, next) {
    try {
        User.findAll(function (err, response) {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    } catch (e) {
        next(e);
    }
})
//get categories
router.get('/categories', async function (req, res, next) {
    try {
        const data = fs.readFileSync(foodCategoriesFilePath);
        const foodCategories = JSON.parse(data);
        res.json(foodCategories);
    } catch (e) {
        next(e);
    }
})
router.get('/foodItems', async function (req, res, next) {
    try {
        Food.findAll(function (err, response) {
            if (err) {
                res.send(err);
            }
            res.json(response);
        });
    } catch (e) {
        next(e);
    }
})

router.get('/foodItem/:id', async function (req, res, next) {
    console.log('ok')
    Recruit.findById(req.params.id, function (err, recruit) {
        if (err)
            res.send(err);
        res.json(recruit);
    });
})

router.delete('/foodItems/:id', async function (req, res, next) {
    try {
        console.log('to delete: ', req.params);
        Food.delete(req.params.id, function (err, response) {
            if (err) {
                res.send(err);
            }
            res.json({ error: false, message: 'Food successfully deleted' });
        });
    } catch (e) {
        next(e);
    }
})

// add foodItem 
router.post('/addFoodItem', async function (req, res, next) {
    try {
        const newFood = new Food(req.body);
        Food.create(newFood, function (err, food) {
            if (err) {
                console.log('err here');
                res.status(400).send({ error: true, message: 'error on inserting food' });
            } else {
                res.json(food);
            }
        })
        res.status(201).json(newFood);
    } catch (e) {
        next(e);
    }
})

router.post('/addUser', async function (req, res, next) {
    try {

        const newUser = new User(req.body);
        User.create(newUser, function (err, user) {
            if (err) {
                console.log('err here');
                res.status(400).send({ error: true, message: 'error on inserting user' });
            } else {
                res.json(user);
            }
        });
        res.status(201).json(newUser);
    } catch (e) {
        next(e);
    }
})

router.post('/addAuthUser', async function (req, res, next) {
    try {
        const newUser = new Authuser({
            username: req.body.userName,
            password: req.body.password
        });
        Authuser.create(newUser, function (err, user) {
            if (err) {
                console.log('err here');
                res.status(400).send({ error: true, message: 'Please provide all required field' });
            } else {
                res.json(user);
            }
        })
        res.status(201).json(newUser);
    } catch (e) {
        console.log('aici eroare')
        next(e);
    }
})

router.post('/login', async function (req, response, next) {
    let username = req.body.userName;
    let password = req.body.password;

    dbConn.query("Select * from auth_users", function (err, res) {
        let users;
        if (err) {
            console.log("error: ", err);
            return null;
        }
        else {
            users = res;
            const index = users.findIndex(u => u.username === username && u.password === password);
            let user = users[index];
            if (user) {
                response.status(200).json({ user })
            } else {
                response.status(400).json({ message: 'Username or password is incorrect' })
            }
        }
    });

})

module.exports = router;
