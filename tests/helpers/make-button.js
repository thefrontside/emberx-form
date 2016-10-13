// Helper for creating button components that can be disabled
import { is } from 'ember-cli-page-object';
import makeComponent from '../helpers/make-component';

const makeButton = (selector) => {
  let options = {
    isDisabled: is(':disabled')
  };

  return makeComponent(selector, options);
}

export default makeButton;
