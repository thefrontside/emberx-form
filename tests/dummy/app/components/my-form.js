import Component from '@ember/component';
import DummyValidations from '../validators/dummy';

export default Component.extend({
  DummyValidations,

  init() {
    this._super(...arguments);
    this.bands = ['Sonic Youth', 'Dinosaur Jr.', 'Shellac', 'Velvet Underground'];
  }
});
