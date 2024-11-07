import {body} from 'express-validator';

class UserValidator {
  static validateUser = [
    body('name')
    .notEmpty()
      .withMessage('Name is required.')
      .isLength({min: 3, max: 10})
      .withMessage('Name must be between 3 and 10 characters long.')
      .trim()
      .escape(),

    body('surname')
    .notEmpty()
    .withMessage('Surname is required.')
    .isLength({min: 3, max: 15})
    .withMessage('Surname must be between 3 and 15 characters long.')
    .trim()
    .escape(),

    body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .trim()
    .escape(),

    body('age')
    .isNumeric()
    .withMessage('Age must be a number.')
    .isInt({min: 6, max: 120})
    .withMessage('Age must be between 6 and 120.')
    .trim()
    .escape(),

    body('avatar')
      .optional()
      .escape()
  ]  
}


export default UserValidator;
