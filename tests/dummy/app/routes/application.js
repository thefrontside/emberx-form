import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let obj = {
      firstName: '',
      lastName: '',
      birthday: new Date(1986, 8, 18),
      favoriteBand: 'Sonic Youth'
    };

    let emberObj = Ember.Object.create(obj);

    return {
      obj,
      emberObj
    };
  }
});
