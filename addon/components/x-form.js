import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import applyChangeset from '../utils/apply-changeset';
import layout from '../templates/components/x-form';

const { computed, get, set, RSVP } = Ember;


/**
 * Wraps a native `<form>` element and provides abstractions for working with `ember-changeset`
 * and `ember-changeset-validations`. It yields a contextual component, `x-field`, which is used
 * to construct the fields of the form.
 *
 * `onSubmit` will be called when the form is submitted with a valid changeset.
 * `onSuccess` is optional, and will be called only if the `submit` action returns a resolved
 * promise
 * @class Ember.XFormComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  layout,

  tagName: 'form',

  /**
   * @property data - provides the initial values of the form fields
   * @type {Object}
   */
  data: null,

   /**
    * @property validations - A Validation map from ember-changeset-validations
    * @type {Changeset.Validation}
    */
  validations: null,

  /**
   * A flag for indicating whether the form is currently in the process of submitting
   * @private
   * @type {Boolean}
   */
  isSubmitting: false,

   /**
    * @property onSubmit - Handler for the form's submit behavior. `onSubmit` will be called when
    * the form is submitted with a valid changeset.
    * @type {Function}
    */
  onSubmit: null,

   /**
    * @property onSuccess - Handler for when `onSubmit` succeeds, called when `onSubmit` returns
    * a resolved Promise
    * @type {Function}
    */
  onSuccess: Ember.K,

  /**
   * @property onError - Handler for errors resulting from the `onSubmit` action, called when
   * `onSubmit` returns a rejected Promise
   * @type {Function}
   */
  onError: Ember.K,

  /**
   * @property onCancel - Action for cancel/close behavior
   * @type {Function}
   */
  onCancel: Ember.K,

  init() {
    this._super(...arguments);
    if(!this.get('data')) {
      throw new Error('x-form needs data');
    }
  },

  changeset: computed('data', 'validations', function() {
    let validations = this.get('validations') ? this.get('validations') : {};

    console.log("OH HEY");
    return new Changeset(
      this.get('data'),
      lookupValidator(validations),
      validations
    );
  }),

  actions: {
    /**
     * [validateProperty call the validations for a specific property in a changeset]
     * @param  {Changeset} changeset An instance of ember-changeset
     * @param  {string}    prop The name of a property in the changeset
     * @return {Promise}
     */
    validateProperty(changeset, prop) {
      return changeset.validate(prop);
    },

    /**
     * The submit behavior for the form. `submit` validates the changeset, and assuming the
     * changes are valid, applies the changeset and passes the resuling to POJO into the `submit`
     * closure action. If an `onSuccess` action has also been passed in, it will be then be called
     * once the `submit` action has completed
     * @param  {Changeset} changeset
     */
    submit(changeset) {
      set(this, 'isSubmitting', true);

      changeset.validate()
        .then(() => {
          if (get(changeset, 'isValid')) {
            let changes = applyChangeset(changeset);
            let submission = get(this, 'onSubmit')(changes);

            return RSVP.resolve(submission)
              .then((record) => {
                set(this, 'isSubmitting', false);
                return get(this, 'onSuccess')(record);
              }, (err) => {
                set(this, 'isSubmitting', false);
                return get(this, 'onError')(err);
              });
          }
        })
        .finally(() => {
          set(this, 'validations', Object.assign({}, get(this, 'validations')));
          set(this, 'isSubmitting', false);
        });
    },

    /**
     * Rollback the changeset (thereby clearing the form)
     * @param  {Changeset} changeset
     * @return {Promise}
     */
    cancel(changeset) {
      changeset.rollback();
      get(this, 'onCancel')();
    }
  }
});
