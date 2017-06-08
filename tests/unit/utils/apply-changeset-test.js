import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import applyChangeset from 'emberx-form/utils/apply-changeset';

describe('applyChangeset', function() {
  // Replace this with your real tests.
  beforeEach(function() {
    let changeset = {};
    this.result = applyChangeset(changeset);
  });

  it('works', function() {
    expect(this.result).to.be.ok;
  });
});
