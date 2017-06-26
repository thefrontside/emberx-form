import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

import person from '../pages/person';

describe('Acceptance: PersonForm', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('visiting the person form page', function() {
    beforeEach(function() {
      person.visit();
    });

    it('contains the form', function() {
      expect(currentPath()).to.equal('reset-changeset');
      expect(person.form.isVisible).to.be.true;
    });

    it('displays the existing data in the form', function() {
      expect(person.form.firstName.value).to.equal('Robert');
      expect(person.form.lastName.value).to.equal('Smith');
    });

    it('starts with the cancel and save buttons hidden', function() {
      expect(person.form.cancelButton.isVisible).to.be.false;
      expect(person.form.submitButton.isVisible).to.be.false;
    });

    describe('filling out the form', function() {
      beforeEach(function() {
        person.form.firstName.fillInAndBlur('Carlos');
        person.form.lastName.fillInAndBlur('Correa');
      });

      it('reveals the cancel and save buttons', function() {
        expect(person.form.cancelButton.isVisible).to.be.true;
        expect(person.form.submitButton.isVisible).to.be.true;
      });

      describe('clicking cancel', function() {
        beforeEach(function() {
          person.form.cancelButton.click();
        });

        it('hides the save and cancel buttons', function() {
          expect(person.form.cancelButton.isVisible).to.be.false;
          expect(person.form.submitButton.isVisible).to.be.false;
        });

        it('reverts the form fields to their original state', function() {
          expect(person.form.firstName.value).to.equal('Robert');
          expect(person.form.lastName.value).to.equal('Smith');
        });
      });

      describe('successfully clicking save', function() {
        beforeEach(function() {
          person.form.submitButton.click();
        });

        it('hides the save and cancel buttons', function() {
          expect(person.form.cancelButton.isVisible).to.be.false;
          expect(person.form.submitButton.isVisible).to.be.false;
        });

        it('retains the edited information in the form', function() {
          expect(person.form.firstName.value).to.equal('Carlos');
          expect(person.form.lastName.value).to.equal('Correa');
        });
      });

      describe('clicking save, but the save fails', function() {
        beforeEach(function() {
          server.patch(`/people/:id`, {}, 500);
          person.form.submitButton.click();
        });

        it('does not hide the save and cancel buttons', function() {
          expect(person.form.cancelButton.isVisible).to.be.true;
          expect(person.form.submitButton.isVisible).to.be.true;
        });

        it('retains the edited information in the form', function() {
          expect(person.form.firstName.value).to.equal('Carlos');
          expect(person.form.lastName.value).to.equal('Correa');
        });
      });
    });
  });
});
