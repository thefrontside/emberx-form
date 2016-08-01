import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export const SimpleValidations = {
  firstName: [
    validatePresence(true),
    validateLength({ min: 4 })
  ],
  //
  // lastName: [
  //   validatePresence(true),
  //   validateLength({ min: 2 })
  // ],
};
