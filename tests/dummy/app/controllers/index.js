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
      let person = this.store.createRecord('person', data);

      return person.save().catch((err) => {
        person.rollbackAttributes();
        throw err;
      })
    },

    onError(err) {
      console.log('error', err);
    },

    onSuccess() {
      console.log('succeeded!');
    },

    cancel() {
      console.log('reverting');
    }
  }
});
