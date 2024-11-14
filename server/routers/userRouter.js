const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');

//get an existing user // /:username/:password
// `http://localhost:8080/user?username=${username}&password=${password}`
router.get('/', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.foundUser);
});

//create a new user (username, password, date of birth required)
router.post('/', userController.createUser, (req, res) => {
  return res.status(201).json(res.locals.createdUser);
});

router.post('/addIngredients', userController.addIngredients, (req, res) => {
  return res.status(200).json('Successfully saved');
});

router.post(
  '/fetchIngredients',
  userController.fetchIngredients,
  (req, res) => {
    return res
      .status(200)
      .json({ userIngredients: res.locals.userIngredients });
  }
);

module.exports = router;
