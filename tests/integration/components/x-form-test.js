import { defer } from 'rsvp';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import { describe, beforeEach, it } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

import { SimpleValidations, SimpleData } from '../../test-utils/validations';

describe('Integration: EmberxFormComponent', function() {
  setupComponentTest('emberx-form-mocha', {
    integration: true
  });

  beforeEach(function() {
    let deferred = this.deferred = defer();

    this.set('data', SimpleData);
    this.set('validations', SimpleValidations);

    this.set('on-submit', (buffer) => {
      this.buffer = buffer;
      return deferred.promise;
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

  describe("rendering x-form with data and a field", function() {
    beforeEach(function() {
      try {
        this.render(hbs`{{#x-form data=data as |form|}}{{form.field}}{{/x-form}}`);
      } catch(e) {
        this.err = e;
      }
    });

    it("renders the form", function() {
      expect(this.err).not.to.exist;
    });
  });

  describe("observing actions", function() {
    beforeEach(function() {
      this.didCall = {
        onSubmit: false,
        onCancel: false
      };
      this.set('on-submit', () => this.didCall.onSubmit = true);
      this.set('on-cancel', () => this.didCall.onCancel = true);

      this.render(hbs`
  {{#x-form
    data=data
    onSubmit=on-submit
    onCancel=on-cancel
    as |form|
  }}
    <button class='submit' {{action form.actions.submit}}></button>
    <button class='cancel' {{action form.actions.cancel}}></button>
  {{/x-form}}
`);
    });
    it("does not fire actions on render", function() {
      expect(this.didCall.onSubmit).to.be.false;
      expect(this.didCall.onCancel).to.be.false;
    });
    describe("clicking submit", function() {
      beforeEach(function() {
        this.$('.submit').click();
      });
      it("fires the submit action", function() {
        expect(this.didCall.onSubmit).to.be.true;
      });
    });
    describe("clicking cancel", function() {
      beforeEach(function() {
        this.$('.cancel').click();
      });
      it("fires the cancel action", function() {
        expect(this.didCall.onCancel).to.be.true;
      });
    });
  });


  describe("when submit returns a promise", function() {
    beforeEach(function() {
      this.didCall = {
        onSuccess: false,
        onError: false
      };
      this.set('on-success', () => this.didCall.onSuccess = true);
      this.set('on-error', () => this.didCall.onError = true);

      this.render(hbs`
  {{#x-form
    data=data
    onSubmit=on-submit
    onSuccess=on-success
    onError=on-error
    as |form|
  }}
    <button class='submit' {{action form.actions.submit}} disabled={{form.isSubmitting}}></button>
  {{/x-form}}
`);
    });

    it("is not in flight", function() {
      let formSubmit = this.$('.submit');
      expect(formSubmit.prop('disabled')).to.be.false;
      expect(this.didCall.onSuccess).to.be.false;
      expect(this.didCall.onError).to.be.false;
    });

    describe("clicking submit", function() {
      beforeEach(function() {
        this.$('.submit').click();
      });
      it("is in flight", function() {
        let formSubmit = this.$('.submit');
        expect(formSubmit.prop('disabled')).to.be.true;
        expect(this.didCall.onSuccess).to.be.false;
        expect(this.didCall.onError).to.be.false;
      });

      describe("resolving the submission", function() {
        beforeEach(function() {
          this.deferred.resolve("Success");
        });
        it("is no longer in flight", function() {
          let formSubmit = this.$('.submit');
          expect(formSubmit.prop('disabled')).to.be.false;
        });
        it("calls onSuccess function", function() {
          expect(this.didCall.onSuccess).to.be.true;
          expect(this.didCall.onError).to.be.false;
        });
      });

      describe("rejecting the submission", function() {
        beforeEach(function() {
          this.deferred.reject("Error");
        });
        it("is no longer in flight", function() {
          let formSubmit = this.$('.submit');
          expect(formSubmit.prop('disabled')).to.be.false;
        });
        it("calls onError function", function() {
          expect(this.didCall.onError).to.be.true;
          expect(this.didCall.onSuccess).to.be.false;
        });
      });
    });
  });
});
