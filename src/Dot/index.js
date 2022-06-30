import SimplexNoise from 'simplex-noise';
import {
  CUSTOM_VALUE_DEFAULT,
} from 'Constants/Dot';

import applyFunction from 'Common/apply';
import makeBaseFunction from './base';

const Dot = (opts = {}) => {
  const {
    element,
    resize = false,
    seed = new Date().getTime(),
    customValue = CUSTOM_VALUE_DEFAULT,
  } = opts;

  if (!element) {
    throw new Error('You must specify and element to attach the texture.');
  }

  const simplex = new SimplexNoise(seed);
  const baseFunction = makeBaseFunction({ ...opts, simplex });

  const {
    repaint,
    update,
  } = applyFunction({
    baseFunction,
    customValue,
    element,
    resize,
  });

  return {
    repaint,
    update,
  };
};

export default Dot;
