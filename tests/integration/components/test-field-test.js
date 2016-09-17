/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'test-field',
  'Integration: TestFieldComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#test-field}}
      //     template content
      //   {{/test-field}}
      // `);

      this.render(hbs`{{test-field}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
