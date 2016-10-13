import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  actions: {
    save(data) {
      let record = this.get('model');
      record.setProperties(data);
      return record.save();
    }
  }
});
