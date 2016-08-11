import Ember from 'ember';
import DummyValidations from '../validators/dummy';

export default Ember.Controller.extend({
  DummyValidations,

  bands: ['Sonic Youth', 'Dinosaur Jr.', 'Shellac', 'Velvet Underground'],

  actions: {
    save(data) {
      console.log('saving');
      console.log(data);
      return Ember.RSVP.resolve(data);
    },

    onError(err) {
      throw new Error(err);
    },

    onSuccess() {
      console.log('succeeded!');
    },

    cancel() {
      console.log('reverting');
    }
  }
});
