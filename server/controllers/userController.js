const models = require('../models/userModel.js');

const userController = {};

userController.getUser = async (req, res, next) => {
  //access user data from request
  if (!req.params.username || !req.params.password) {
    return next({
      log: 'Did not receive username and password parameters in getUser request',
      status: 401,
      message: { err: 'username or password were not submitted.' },
    });
  }

  const username = req.params.username;
  const password = req.params.password;

  try {
    const data = await models.User.findOne({ username }); //shove user data here
    console.log('Data: ', data);

    if (data.password === password) {
      res.locals.foundUser = data;
      return next();
    } else
      return next({
        log: 'password provided by getUser request did not match stored password in the database',
        status: 401,
        message: { err: `incorrect password for ${username}` },
      });
  } catch (error) {
    return next({
      log: 'Error in userController.getUser: ' + error,
      status: 500,
      message: { err: 'Unable to retrieve user from database.' },
    });
  }
};

userController.createUser = async (req, res, next) => {
  //access user data from request
  if (
    typeof req.body.username !== 'string' ||
    typeof req.body.password !== 'string' ||
    typeof req.body.birthday !== 'string'
  ) {
    return next({
      log: 'Data types of userController.createUser request are invalid',
      status: 401,
      message: { err: 'Incomplete user data provided' },
    });
  }

  const userToCreate = {
    username: req.body.username,
    password: req.body.password,
    birthday: req.body.birthday,
    ingredients: [],
    favoriteRecipes: [],
  };

  try {
    const data = await models.User.create(userToCreate); //shove user data here
    console.log('Data: ', data);
    console.log({ data });
    res.locals.createdUser = data;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.createUser: ' + error,
      status: 500,
      message: { err: 'An error occurred while creating your user' },
    });
  }
};

module.exports = userController;
