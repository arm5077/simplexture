import SimplexNoise from 'simplex-noise';

import applyFunction from 'Common/apply';
import DotFunction from './Dot';
import DashFunction from './Dash';
import WaveFunction from './Wave';

const functions = {
  DashFunction,
  DotFunction,
  WaveFunction,
};

const Initialize = (format, opts = {}) => {
  const makeBaseFunction = functions[`${format}Function`];
  const {
    target,
    resize = false,
    seed = new Date().getTime(),
    customValue = 0,
  } = opts;

  if (!target) {
    throw new Error('You must specify and target to attach the texture.');
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
    target,
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
export const Wave = (opts) => Initialize('Wave', opts);
