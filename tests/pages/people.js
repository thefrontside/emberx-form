import {
  create,
  visitable,
  fillable,
  selectable,
  triggerable,
  hasClass,
  is,
  collection,
  text
} from 'ember-cli-page-object';

const makeComponent = (selector, options) => {
  let baseComponent = {
    scope: selector
  };

  return Object.assign({}, baseComponent, options);
}

const makeButton = (selector) => {
  let options = {
    isDisabled: is(':disabled')
  };

  return makeComponent(selector, options);
}

const makeField = (fieldSelector, inputSelector, [name, action]) => {
  let options = {
    hasErrors: hasClass('has-error'),

    [name]: action(inputSelector),
    blur: triggerable('blur', inputSelector),

    [`${name}AndBlur`](value) {
      this[name](value);
      this.blur();
    }
  };

  return makeComponent(fieldSelector, options);
}

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
