import Ember from 'ember';
import layout from '../templates/components/x-field';

export default Ember.Component.extend({
  layout,
  actions: {
    set(value) {
      let key = this.get('property');
      this.get('form').setField(key, value)
    },
    validate() {
      // NB this will write to the changeset
      return this.get('form.changeset').validate();
    },
  }
});
