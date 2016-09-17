/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  xSet
} from 'emberx-form/helpers/x-set';

describe('XSetHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = xSet(42);
    expect(result).to.be.ok;
  });
});
