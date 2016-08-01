import Ember from 'ember';

const { get, assign } = Ember;

// applyChangeset :: Changeset -> {...changes}
export default function applyChangeset(changeset) {
  let changes = get(changeset, 'changes');
  return changes.reduce((acc, elem) => {
    return assign(acc, { [elem.key]: elem.value });
  }, {});
}
