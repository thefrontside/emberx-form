// Helper for making form-field components.
// fieldSelector: the entire form-group
// inputSelector: the actual form input element (could be input, select box, etc.)
// action: a tuple containing the action name and the page object helper you'd like to call, e.g.
//   `fillable`, `selectable`, etc.
import {
  triggerable,
  hasClass,
  value,
} from 'ember-cli-page-object';
import makeComponent from '../helpers/make-component';

const makeField = (fieldSelector, inputSelector, [name, action]) => {
  let options = {
    hasErrors: hasClass('has-danger'),

    value: value(inputSelector),

    [name]: action(inputSelector),
    blur: triggerable('blur', inputSelector),

    // This create a composite action that will call the action defined above, and then trigger
    // the blur event
    // In your test, use this as (for example) `pageObject.field.fillInAndBlur`
    [`${name}AndBlur`](value) {
      this[name](value);
      this.blur();
    }
  };

  return makeComponent(fieldSelector, options);
}

export default makeField;
