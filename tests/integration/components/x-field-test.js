import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'x-field',
  'Integration: XFieldComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#x-field-test}}
      //     template content
      //   {{/x-field-test}}
      // `);

      this.render(hbs`{{x-field}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
