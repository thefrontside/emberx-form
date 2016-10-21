import Ember from 'ember';
import DummyValidations from '../validators/dummy';

export default Ember.Component.extend({
  DummyValidations,
  bands: ['Sonic Youth', 'Dinosaur Jr.', 'Shellac', 'Velvet Underground']
});
