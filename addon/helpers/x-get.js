import Ember from 'ember';

const hasGetter = (obj) => obj && !!obj.get;
const shouldDeferToEmberGet = (obj) => obj instanceof Ember.Object || !obj.get;

export function xGet([object, path]) {
  if (shouldDeferToEmberGet(object)) {
    return Ember.get(object, path);
  }

  Ember.assert('The path argument should be a string', typeof path === 'string');
  Ember.assert('x-get should only be used with objects that have a `get` method', hasGetter(object));

  return object.get(path);
}

export default Ember.Helper.helper(xGet);
