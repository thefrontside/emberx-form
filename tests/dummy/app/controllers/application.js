import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this.model = {
      firstName: '',
      lastName: '',
      birthday: new Date(1986, 8, 18),
      friends: ['charles', 'brandon', 'rob', 'alex', 'stephanie']
    };
  }
});
