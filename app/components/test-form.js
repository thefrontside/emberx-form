import Ember from 'ember';
import layout from '../templates/components/test-form';
import cb from 'npm:change-buffer';

const { ChangeBuffer } = cb;

const { get } = Ember;

export default Ember.Component.extend({
  layout,

  data: null,

  buffer: null,

  init() {
    this._super(...arguments);
    this.set('buffer', new ChangeBuffer(get(this, 'data')));
  },

  actions: {
    update(buffer, property, value) {
      console.log('updating the buffer');
      buffer.set(property, value);
      console.log(buffer.get(property));
    },

    submit(buffer) {
      console.log('submitting!');
      let result = buffer.apply();
      console.log(result);
    },

    cancel(buffer) {
      console.log('rolling back');
      buffer.rollback();
    }
  }
});
