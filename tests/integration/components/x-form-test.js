import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import SimpleValidations from '../../test-utils/validations';

moduleForComponent('x-form', 'Integration | Component | x form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  this.set('data', {
    firstName: '',
  });

  this.set('validations', SimpleValidations);
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#x-form data=data validations=validations as |form|}}
      {{form.field property="firstName" label="First Name"}}

      <button data-test-form-submit {{action form.submit}}>Save</button>
      <button data-test-form-revert {{action form.revert}}>Revert</button>
    {{/x-form}}
  `);

  assert.equal(this.$('form input').length, 1, 'should have 1 input field');
  assert.equal(this.$('form label[for="x-field-firstName"]').text().trim(), 'First Name', 'label should be "First Name"');

  // this.$('.x-field-firstName').val('John');
  // this.$('.x-field-firstName').change();
  //
  // this.$('[data-test-form-submit]').click();
});
