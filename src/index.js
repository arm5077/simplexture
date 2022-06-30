import SimplexNoise from 'simplex-noise';

import applyFunction from 'Common/apply';
import DotFunction from './Dot';
import DashFunction from './Dash';

const functions = {
  DashFunction,
  DotFunction,
};

const Initialize = (format, opts = {}) => {
  const makeBaseFunction = functions[`${format}Function`];
  const {
    element,
    resize = false,
    seed = new Date().getTime(),
    customValue = 0,
  } = opts;

  if (!element) {
    throw new Error('You must specify and element to attach the texture.');
  }

  const simplex = new SimplexNoise(seed);
  const baseFunction = makeBaseFunction({ ...opts, simplex });

  const {
    remove,
    repaint,
    update,
  } = applyFunction({
    baseFunction,
    customValue,
    element,
    resize,
  });

  return {
    remove,
    repaint,
    update,
  };
};

export const Dot = (opts) => Initialize('Dot', opts);
export const Dash = (opts) => Initialize('Dash', opts);
