import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { SimpleValidations, SimpleData } from '../../test-utils/validations';

moduleForComponent('x-form', 'Integration | Component | x form', {
  integration: true
});

test('it cannot be instantiated without data', function(assert) {
  assert.expect(1);
  let err = null;
  try { this.render(hbs`{{x-form}}`); } catch(e) { err = e; }
  assert.ok(err, 'x-form cannot render without data attribute');
});

test('it renders with data', function(assert) {
  assert.expect(1);
  let err = null;
  try { this.render(hbs`{{x-form data=(hash)}}`); } catch(e) { err = e; }
  assert.notOk(err, 'x-form renders with a data attribute');
});

test('observing form actions', function(assert) {
  assert.expect(2);
  this.set('data', SimpleData);

  this.set('submit', () => assert.ok(true) );
  this.set('cancel', () => assert.ok(true) );

  // Template block usage:
  this.render(hbs`
    {{#x-form
       data=data
       onSubmit=submit
       onCancel=cancel
       as |form|
    }}
      <button class='submit' {{action form.actions.onSubmit}}>Submit</button>
      <button class='cancel' {{action form.actions.onCancel}}>Cancel</button>
    {{/x-form}}
  `);

  this.$('.submit').click();
  this.$('.cancel').click();

});

// test('simple validations', function(assert) {
//   // Set any properties with this.set('myProperty', 'value');
//   this.set('data', SimpleData);

//   this.set('validations', SimpleValidations);
//   // Handle any actions with this.on('myAction', function(val) { ... });

//   // Template block usage:
//   this.render(hbs`
//     {{#x-form data=data validations=validations as |form|}}
//       {{#form.field
//          class="field-firstName"
//          property="firstName"
//          label="First Name"
//          as |field|
//       }}
//         <button on-click=form.actions.onSubmit'>Check Validity</button>
//       {{/form.field}}
//     {{/x-form}}
//   `);

//   debugger;

//   assert.equal(this.$('form > div').length, 1, 'should have a form');


//   // this.$('.x-field-firstName').val('John');
//   // this.$('.x-field-firstName').change();
//   //
//   // this.$('[data-test-submit();
// });
