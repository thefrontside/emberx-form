import Controller from '@ember/controller';
import { inject as service} from '@ember/service'

export default Controller.extend({
  store: service(),

  actions: {
    save(data) {
      let record = this.get('model');
      record.setProperties(data);
      return record.save();
    }
  }
});
