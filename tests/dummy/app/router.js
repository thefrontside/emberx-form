import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('reset-changeset');
  this.route('route-transitions', function() {
    this.route('new');
    this.route('edit', { path: '/:person_id' });
  });
});

export default Router;
