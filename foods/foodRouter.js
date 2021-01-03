const router = require('express').Router();

const Food = require('./foodModel');
const UserFood = require('./userFoodModel');
const db = require('../data/dbConfig');

// GET list of foods
router.get('/', (req, res) => {
  Food.find()
    .then(foods => {
      console.log(foods);
      res.status(200).send(foods);
    }) 
    .catch(error => {
      console.log(error);
      console.log({message: 'Error getting food list from the database.'});
    })
});

// GET list food by ID
router.get('/:id', (req, res) => {
    const user_id = req.user.id;
    const food_id = req.params.id;
  
    Food.findById(food_id)
        .then(food => {
            console.log(food);
            res.status(200).send(food);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message: 'Error retrieving food by id from database.'})
        })
  });

// ADD a new food to list of foods
router.post('/', validateFoodData, (req, res) => {
    let foodData = req.body;

    Food.add(foodData)
        .then(food => {
            console.log(food);
            res.status(201).send(food);
        })
          .catch(error => {
            res.status(503).json({message: "Error adding food list." });
            console.log(error);
          });
})

// GET list of food by User ID
router.get('/user/:id', (req, res) => {

    console.log(req.user.id);
  
    UserFood.find(req.user.id)
      .then(userFood => {
        res.status(200).send(userFood);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({message: 'Error retrieving users food list from database.'});
      })
  });

// ADD new food to list by User ID
router.post('/user/:id', (req, res) => {
    let userFood = req.body;
    const user_id = req.user.id;
    userFood["user_id"] = user_id;

    UserFood.add(userFood)
        .then(foods => {
            console.log(foods);
            res.status(201).send(foods);
        })
          .catch(error => {
            res.status(503).json({message: 'Error adding user food to list'});
            console.log(error);
          });
})

// DELETE food list from User by ID
router.delete('/user/:id', (req, res) => {
    const user_id = req.user.id;
    const food_id = req.params.id;

    UserFood.remove(user_id, food_id)
        .then(food => {
            console.log(food);
            res.status(200).send({message: 'Food list was deleted from user.'})
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({message: 'Error deleting user food list.'})
        })
})

function validateFoodData(req, res, next) {
    const foodData = req.body;

    if(!foodData.name) {
        res.status(400).send({message: 'Food title required.'});
    } else {
        next();
    }
}

module.exports = router;