import {
  create,
  visitable,
  fillable,
  selectable,
  collection,
  text,
} from 'ember-cli-page-object';

import makeButton from '../helpers/make-button';
import makeField from '../helpers/make-field';

export default create({
  visit: visitable('/'),

  form: {
    scope: '#test-form',

    firstName: makeField('[data-test-first-name]', '#form-first-name', ['fillIn', fillable]),
    lastName: makeField('[data-test-last-name]', '#form-last-name', ['fillIn', fillable]),
    favoriteBand: makeField('[data-test-favorite-band]', '#form-favorite-band', ['select', selectable]),

    submitButton: makeButton('[data-test-submit-button]'),
    cancelButton: makeButton('[data-test-cancel-button]')
  },

  list: collection({
    scope: '[data-test-people-list]',
    itemScope: '[data-test-people-list-item]',

    item: {
      name: text('h4.list-group-item-heading'),
      favoriteBand: text('p.list-group-item-text')
    }
  })
});
