import { scaleLinear } from 'd3-scale';

import {
  SEGMENT_WIDTH_DEFAULT,
  PADDING_DEFAULT,
  MIN_HEIGHT_VARIATION_DEFAULT,
  MAX_HEIGHT_VARIATION_DEFAULT,
  NOISE_X_DEFAULT,
  NOISE_Y_DEFAULT,
  NOISE_CUSTOM_DEFAULT,
  STYLE_DEFAULT_LINE_WIDTH,
  STYLE_DEFAULT_STROKE_STYLE,

} from 'Constants/Wave';

const makeBaseFunction = ({
  simplex,
  segmentWidth = SEGMENT_WIDTH_DEFAULT,
  padding = PADDING_DEFAULT,
  minHeightVariation = MIN_HEIGHT_VARIATION_DEFAULT,
  maxHeightVariation = MAX_HEIGHT_VARIATION_DEFAULT,
  noise = {},
  style = {},
} = {}) => {
  const {
    strokeStyle = STYLE_DEFAULT_STROKE_STYLE,
    lineWidth = STYLE_DEFAULT_LINE_WIDTH,
  } = style;

  const {
    x: noiseX = NOISE_X_DEFAULT,
    y: noiseY = NOISE_Y_DEFAULT,
    custom: noiseCustom = NOISE_CUSTOM_DEFAULT,
  } = noise;

  const heightScale = scaleLinear()
    .domain([-1, 1])
    .range([minHeightVariation, maxHeightVariation]);

  return ({
    ctx,
    customValue = 0,
    height,
    width,
  }) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    const columns = Math.floor(width / segmentWidth);
    const rows = Math.floor(height / padding);

    for (let y = 0; y < rows; y += 1) {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x < columns; x += 1) {
        const xPos = x * segmentWidth;
        const delta = simplex.noise3D(
          x * noiseX,
          y * noiseY,
          customValue * noiseCustom,
        );
        const yPos = y * padding + heightScale(delta);
        ctx.lineTo(xPos, yPos);
      }
      ctx.stroke();
      ctx.restore();
    }
  };
};

export default makeBaseFunction;
