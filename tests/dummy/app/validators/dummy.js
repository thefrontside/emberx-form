import {
  validatePresence,
  validateLength,
  validateInclusion
} from 'ember-changeset-validations/validators';

export default {
  firstName: [
    validatePresence(true),
    validateLength({ min: 4 })
  ],

  lastName: [
    validatePresence(true),
    validateLength({ min: 2 })
  ],

  favoriteBand: [
    validatePresence(true),
    validateInclusion({
      list: ['Sonic Youth', 'Dinosaur Jr.', 'Shellac', 'Velvet Underground']
    })
  ]
};
