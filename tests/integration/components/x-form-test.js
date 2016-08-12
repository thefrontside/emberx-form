/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

import { /*SimpleValidations,*/ SimpleData } from '../../test-utils/validations';

describeComponent(
  'emberx-form-mocha',
  'Integration: EmberxFormComponent',
  {
    integration: true
  },
  function() {
    beforeEach(function() {
      this.count = 0;
      this.set('data', SimpleData);
      this.set('inc', () => {
        return this.count++;
      });
      this.set('submit', (buffer) => {
        this.buffer = buffer;
        return this.promise = new Ember.RSVP.Promise(() => {});
      });
    });

    describe("rendering x-form without data", function() {
      beforeEach(function() {
        try {
          this.render(hbs`{{x-form}}`);
        } catch(e) {
          this.err = e;
        }
      });
      it("cannot be rendered", function() {
        expect(this.err).to.exist;
      });
    });

    describe("rendering x-form with data", function() {
      beforeEach(function() {
        try {
          this.render(hbs`{{x-form data=data}}`);
        } catch(e) {
          this.err = e;
        }
      });
      it("renders the form", function() {
        expect(this.err).not.to.exist;
      });
    });

    describe("observing form actions", function() {
      beforeEach(function() {
        this.render(hbs`
    {{#x-form
      data=data
      onSubmit=inc
      onCancel=inc
      as |form|
    }}
      <button class='submit' {{action form.actions.onSubmit}}>Submit</button>
      <button class='cancel' {{action form.actions.onCancel}}>Cancel</button>
    {{/x-form}}
  `);
      });
      describe("clicking sumbit", function() {
        beforeEach(function() {
          this.$('.submit').click();
        });
        it("fires onSubmit action", function() {
          expect(this.count).to.equal(1);
        });
      });
      describe("clicking cancel", function() {
        beforeEach(function() {
          this.$('.cancel').click();
        });
        it("fires onCancel action", function() {
          expect(this.count).to.equal(1);
        });
      });


    });
    describe("the form submit cycle", function() {
      beforeEach(function() {
        this.render(hbs`
    {{#x-form
      data=data
      onSubmit=submit
      onSuccess=inc
      onError=inc
      as |form|
    }}
      <button class='submit' {{action form.actions.onSubmit}}>Submit</button>
      <div class={{if form.isSubmitting "in-flight"}}></div>
    {{/x-form}}
  `);
      });
      describe("before submitting the form", function() {
        it("is not in flight", function() {
          expect(this.$('.in-flight').length).to.equal(0);
        });

        describe("clicking submit", function() {
          beforeEach(function() {
            this.set('submit', () => new Ember.RSVP.Promise(() => {}) );
            this.$('.submit').click();
          });
          it("is in flight", function() {
            expect(this.$('.in-flight').length).to.equal(1);
            expect(this.count).to.equal(0);
          });
        });

        describe("resolving submit", function() {
          beforeEach(function() {
            this.set('submit', () => Ember.RSVP.Promise.resolve("Success") );
            return this.$('.submit').click();
          });
          it("is no longer in flight", function() {
            expect(this.$('.in-flight').length).to.equal(0);
          });
          it("calls onSuccess function", function() {
            expect(this.count).to.equal(1);
          });
        });

        describe("rejecting submit", function() {
          beforeEach(function() {
            this.set('submit', () => Ember.RSVP.Promise.reject("Error") );
            return this.$('.submit').click();
          });
          it("is no longer in flight", function() {
            expect(this.$('.in-flight').length).to.equal(0);
          });
          it("calls onError function", function() {
            expect(this.count).to.equal(1);
          });
        });
      });
    });
  }
);
