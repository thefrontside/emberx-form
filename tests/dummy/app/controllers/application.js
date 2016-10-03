/* eslint no-console: "off" */
import Ember from 'ember';
import DummyValidations from '../validators/dummy';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  DummyValidations,

  bands: ['Sonic Youth', 'Dinosaur Jr.', 'Shellac', 'Velvet Underground'],

  actions: {
    save(data) {
      console.log('saving');
      return this.store.createRecord('person', data);
    },

    onError(err) {
      throw new Error(err);
    },

    onSuccess(record) {
      console.log('succeeded!');
      record.save();
    },

    cancel() {
      console.log('reverting');
    }
  }
});
