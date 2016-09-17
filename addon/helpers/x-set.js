import Ember from 'ember';

const hasSetter = (obj) => obj && !!obj.set;
const shouldDeferToEmberGet = (obj) => obj instanceof Ember.Object || !obj.set;

export function xSet([object, path, value]) {
  console.log('x-set');
  if (shouldDeferToEmberGet(object)) {
    return Ember.set(object, path, value);
  }

  Ember.assert('The path argument should be a string', typeof path === 'string');
  Ember.assert('x-set should only be used with objects that have a `set` method', hasSetter(object));
}

export default Ember.Helper.helper(xSet);
