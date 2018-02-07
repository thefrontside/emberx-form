import { get } from '@ember/object';

/**
 * Returns a POJO containing the results of applying all (valid) changes from the Changeset
 * @param {Changeset} changeset
 * @return {Object}
 */
export default function applyChangeset(changeset) {
  return Object.assign({}, get(changeset, 'change'));
}
