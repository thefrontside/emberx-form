/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  xGet
} from 'emberx-form/helpers/x-get';

describe('XGetHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = xGet(42);
    expect(result).to.be.ok;
  });
});
