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

import routeTransitionForm from '../pages/route-transition-form';

describe('Acceptance: RouteTransition', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('visiting a page with a form component', function() {
    beforeEach(function() {
      routeTransitionForm.visit();
      routeTransitionForm.selectFirstEditForm();
    });

    it('contains the form', function() {
      expect(currentURL()).to.equal('/route-transitions/1');
      expect(routeTransitionForm.form.isVisible).to.be.true;
    });

    it('displays the existing data in the form', function() {
      expect(routeTransitionForm.form.firstName.value).to.equal('Robert');
      expect(routeTransitionForm.form.lastName.value).to.equal('Smith');
    });

    describe('clicking to go to another page with the same component', function() {
      beforeEach(function() {
        routeTransitionForm.selectSecondEditForm();
      });

      it('updates the data in the form to reflect the new route', function() {
        expect(routeTransitionForm.form.firstName.value).to.equal('Brendan');
        expect(routeTransitionForm.form.lastName.value).to.equal('Canning');
      });

      describe('selecting a route where a new model will be created with the same component', function() {
        beforeEach(function() {
          routeTransitionForm.selectCreateForm();
        });

        it('clears the data out of the form', function() {
          expect(routeTransitionForm.form.firstName.value).to.equal('');
          expect(routeTransitionForm.form.lastName.value).to.equal('');
        });
      });

      describe('returning to the original page', function() {
        beforeEach(function() {
          routeTransitionForm.selectFirstEditForm();
        });

        it('updates the data in the form to reflect the new route', function() {
          expect(routeTransitionForm.form.firstName.value).to.equal('Robert');
          expect(routeTransitionForm.form.lastName.value).to.equal('Smith');
        });
      });
    });
  });
});
