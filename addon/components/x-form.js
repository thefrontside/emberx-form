import Ember from 'ember';
import { PropTypes as P } from 'ember-prop-types';
import layout from '../templates/components/x-form';
import applyChangeset from '../utils/apply-changeset';

const { get } = Ember;

export default Ember.Component.extend({
  layout,

  tagName: 'form',

  propTypes: {
    data: P.oneOfType([
      P.array,
      P.object,
      P.EmberObject,
    ]).isRequired,
    validations: P.object,
  },

  actions: {
    // validateProperty :: (Changeset, String) -> Promise
    validateProperty(changeset, prop) {
      return changeset.validate(prop);
    },

    // submit :: Changeset -> Result
    submit(changeset) {
      console.log('x-form save');
      return changeset.validate()
        .then(() => {
          if (get(changeset, 'isValid')) {
            let newData = applyChangeset(changeset);
            console.log(newData);
            return newData;
          }
        });
    },

    // revert :: Changeset -> Promise
    revert(changeset) {
      return changeset.rollback();
    }
  }
});
