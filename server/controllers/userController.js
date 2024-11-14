const models = require('../models/userModel.js');

const userController = {};

userController.getUser = async (req, res, next) => {
  //access user data from request
  if (!req.query.username || !req.query.password) {
    return next({
      log: 'Did not receive username and password parameters in getUser request',
      status: 401,
      message: { err: 'username or password were not submitted.' },
    });
  }

  const username = req.query.username;
  const password = req.query.password;

  try {
    const data = await models.User.findOne({ username }); //shove user data here
    // console.log('Data: ', data);

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
  //convert potential new user birthday to Date
  const userAge = new Date (req.body.birthday)

  //figure out the date corresponding to 21 years old
  const minAge = new Date ();
  minAge.setFullYear(minAge.getFullYear()-21);

  //if user is underage, do not proceed with making account. kick back message to front end.
  if(userAge > minAge){
    return res.status(403).json({message:'Users must be 21 to create an account!'});
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

userController.addIngredients = async (req, res, next) => {
  //access user data from request
  console.log('This is the current user: ', req.body.username);
  console.log('This is what they want to add: ', req.body.addIngredients);

  const username = req.body.username;
  const addIngredients = req.body.addIngredients;

  try {
    // Find the correct user
    const foundUser = await models.User.findOne({ username }); //shove user data here
    console.log('User: ', foundUser);
    // Replace user ingredients array with whatever was sent from frontend
    foundUser.ingredients = addIngredients;
    await foundUser.save();
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.getUser: ' + error,
      status: 500,
      message: { err: 'Unable to retrieve user from database.' },
    });
  }
};

userController.fetchIngredients = async (req, res, next) => {
  console.log('This is the current user: ', req.body.username);
  const username = req.body.username;

  try {
    // Find the correct user
    const foundUser = await models.User.findOne({ username }); //shove user data here
    console.log('User: ', foundUser);
    // Send their saved ingredients back
    res.locals.userIngredients = foundUser.ingredients ;
    console.log('sending back: ', res.locals.userIngredients);
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.getUser: ' + error,
      status: 500,
      message: { err: 'Unable to retrieve user from database.' },
    });
  }

}

module.exports = userController;
