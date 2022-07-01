const apply = ({
  baseFunction,
  customValue: initialCustomValue,
  target,
  resize,
} = {}) => {
  if (target.tagName !== 'CANVAS') {
    throw new Error('Looks like you\'re trying to apply a texture to an target '
    + 'that isn\'t a <canvas>.');
  }

  const ctx = target.getContext('2d');
  let customValue = initialCustomValue;
  let height;
  let width;

  const getSize = () => {
    const bbox = target.getBoundingClientRect();
    height = bbox.height;
    width = bbox.width;
    const scale = window.devicePixelRatio;
    ctx.canvas.width = Math.floor(width * scale);
    ctx.canvas.height = Math.floor(height * scale);
    ctx.scale(scale, scale);
    ctx.clearRect(0, 0, width, height);

    return { height, width };
  };

  const runBase = ({ customValue: newCustomValue = customValue } = {}) => {
    baseFunction({
      ctx,
      customValue: newCustomValue,
      height,
      width,
    });
  };

  const onResize = () => {
    getSize();
    runBase();
  };

  if (resize) {
    window.addEventListener('resize', onResize);
  }

  const remove = () => {
    window.removeEventListener('resize', onResize);
    ctx.clearRect(0, 0, width, height);
  };

  getSize();
  runBase();

  return {
    repaint: ({ customValue: newCustomValue = customValue } = {}) => {
      customValue = newCustomValue;
      runBase({ customValue });
    },
    update: ({ customValue: newCustomValue = customValue } = {}) => {
      customValue = newCustomValue;
      getSize();
      runBase({ customValue });
    },
    remove,
  };
};

export default apply;
