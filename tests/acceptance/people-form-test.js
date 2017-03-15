/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

import people from '../pages/people';

describe('Acceptance: PeopleForm', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe.only('visiting the people form page', function() {
    beforeEach(function() {
      people.visit();
    });

    it('starts out as pristine and not dirty', function() {
      debugger;
      expect(people.form.isDirty).to.equal(false, 'Should be not dirty');
      expect(people.form.isPristine).to.equal(true, 'Should be pristine');
    });

    it('contains the form', function() {
      expect(currentPath()).to.equal('index');
      expect(people.form.isVisible).to.be.true;
    });

    it('contains the list and has the correct length', function() {
      expect(people.list().isVisible).to.be.true;
      expect(people.list().count, 'There should be two people in the list').to.equal(2);
    });

    it('starts with a disabled submit button', function() {
      expect(people.form.submitButton.isVisible).to.be.true;
      expect(people.form.submitButton.isDisabled).to.be.true;
    });

    describe('filling out the form with insufficient data', function() {
      beforeEach(function() {
        people.form.firstName.fillInAndBlur('c');
        people.form.lastName.fillInAndBlur('f');
      });

      it('has a value in first name', function() {
        expect(people.form.firstName.value).to.equal('c');
      });

      it('indicates the form is dirty and not pristine', function() {
        expect(people.form.isDirty).to.equal(true, 'Should be dirty');
        expect(people.form.isPristine).to.equal(false, 'Should not pristine');
      });

      it('still has a disabled submit button', function() {
        expect(people.form.submitButton.isDisabled).to.be.true;
      });

      it('has errors', function() {
        expect(people.form.firstName.hasErrors).to.be.true;
        expect(people.form.lastName.hasErrors).to.be.true;

        it('is dirty', function() {
          expect(people.form.isDirty).to.equal(true, 'Should not dirty');
          expect(people.form.isPristine).to.equal(false, 'Should not pristine');
        });
      });

      describe('clicking cancel', function() {
        beforeEach(function() {
          people.form.cancelButton.click();
        });

        it('rolls back to an empty state', function() {
          expect(people.form.firstName.value).to.equal('');
          expect(people.form.lastName.value).to.equal('');
        });

        it('ends up pristine and not dirty', function() {
          expect(people.form.isDirty).to.equal(false, 'Should be not dirty');
          expect(people.form.isPristine).to.equal(true, 'Should be pristine');
        });
      });
    });

    describe('filling out the form with correct data', function() {
      beforeEach(function() {
        people.form.firstName.fillInAndBlur('john');
        people.form.lastName.fillInAndBlur('smith');
        people.form.favoriteBand.selectAndBlur('Shellac');
      });

      it('has the correct value', function() {
        expect(people.form.firstName.value).to.equal('john');
      });

      it('enables the submit button', function() {
        expect(people.form.submitButton.isDisabled).to.be.false;
      });

      it('has no errors', function() {
        ['firstName', 'lastName', 'favoriteBand'].forEach(field => {
          expect(people.form[field].hasErrors).to.be.false;
        });
      });

      describe('submitting the form', function() {
        beforeEach(function() {
          people.form.submitButton.click();
        });

        it('adds a new person to the list', function() {
          expect(people.list().count).to.equal(3);
        });

        it('creates a new person with the correct information', function() {
          expect(people.list(2).name).to.equal('john smith');
          expect(people.list(2).favoriteBand).to.equal('Favorite Band: Shellac');
        });

        it('ends up pristine and not dirty', function() {
          expect(people.form.isDirty).to.equal(false, 'Should be not dirty');
          expect(people.form.isPristine).to.equal(true, 'Should be pristine');
        });
      });
    });
  });
});
