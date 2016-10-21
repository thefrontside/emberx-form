// Make a basic page object component and merge in options
const makeComponent = (selector, options) => {
  let baseComponent = {
    scope: selector
  };

  return Object.assign({}, baseComponent, options);
}

export default makeComponent;
