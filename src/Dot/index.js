import { scaleLinear } from 'd3-scale';

import {
  PADDING_DEFAULT,
  MIN_RADIUS_DEFAULT,
  MAX_RADIUS_DEFAULT,
  NOISE_DEFAULT,
  STYLE_DEFAULT_FILL,
} from 'Constants/Dot';

const makeBaseFunction = ({
  simplex,
  padding = PADDING_DEFAULT,
  minRadius = MIN_RADIUS_DEFAULT,
  maxRadius = MAX_RADIUS_DEFAULT,
  noise = NOISE_DEFAULT,
  style = {},
} = {}) => {
  const { fill = STYLE_DEFAULT_FILL } = style;
  const radiusScale = scaleLinear()
    .domain([-1, 1])
    .range([minRadius, maxRadius]);

  return ({
    ctx,
    customValue = 0,
    height,
    width,
  }) => {
    ctx.clearRect(0, 0, width, height);
    const gridWidth = (2 * maxRadius + padding);
    const columns = Math.ceil(width / gridWidth);
    const rows = Math.ceil(height / gridWidth);

    for (let y = 0; y < rows; y += 1) {
      const yPos = y * gridWidth + maxRadius;
      for (let x = 0; x < columns; x += 1) {
        const xPos = x * gridWidth + maxRadius;
        const random = simplex.noise3D(
          x * noise.x,
          y * noise.y,
          customValue * noise.custom,
        );

        ctx.save();
        ctx.beginPath();
        ctx.arc(
          xPos,
          yPos,
          radiusScale(random), // Radius
          0, // Start angle
          Math.PI * 2, // Finish angle — 360 in radians
          0, // Clockwise
        );
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
      }
    }
  };
};

export default makeBaseFunction;
