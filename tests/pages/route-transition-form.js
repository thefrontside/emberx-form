import {
  create,
  clickable,
  fillable,
  selectable,
  visitable,
} from 'ember-cli-page-object';

import makeField from '../helpers/make-field';

export default create({
  visit: visitable('/route-transitions'),
  selectFirstEditForm: clickable('.test-first-edit-form'),
  selectSecondEditForm: clickable('.test-second-edit-form'),
  selectCreateForm: clickable('.test-create-form'),

  form: {
    scope: '#test-form',

    firstName: makeField('[data-test-first-name]', '#form-first-name', ['fillIn', fillable]),
    lastName: makeField('[data-test-last-name]', '#form-last-name', ['fillIn', fillable]),
    favoriteBand: makeField('[data-test-favorite-band]', '#form-favorite-band', ['select', selectable])
  }
});
