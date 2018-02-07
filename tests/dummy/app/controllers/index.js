/* eslint no-console: "off" */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import DummyValidations from '../validators/dummy';

export default Controller.extend({
  store: service(),

  DummyValidations,

  init() {
    this._super(...arguments);
    this.bands = ['Sonic Youth', 'Dinosaur Jr.', 'Shellac', 'Velvet Underground'];
  },

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
