import Ember from 'ember';
import { PropTypes as P } from 'ember-prop-types';
import layout from '../templates/components/x-field';

export default Ember.Component.extend({
  layout,

  propTypes: {
    changeset: P.shape({
      changes: P.array.isRequired,
      validate: P.func.isRequired,
      rollback: P.func.isRequired
    }).isRequired,
    property: P.string.isRequired,
    validate: P.func.isRequired,
  }
});
