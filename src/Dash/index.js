import { scaleLinear } from 'd3-scale';

import {
  PADDING_DEFAULT,
  LINE_LENGTH,
  NOISE_DEFAULT,
  STYLE_DEFAULT_STROKE_STYLE,
  STYLE_DEFAULT_LINE_WIDTH,
  STYLE_DEFAULT_LINE_CAP,
} from 'Constants/Dash';

const makeBaseFunction = ({
  simplex,
  padding = PADDING_DEFAULT,
  lineLength = LINE_LENGTH,
  noise = NOISE_DEFAULT,
  style = {},
} = {}) => {
  const {
    strokeStyle = STYLE_DEFAULT_STROKE_STYLE,
    lineWidth = STYLE_DEFAULT_LINE_WIDTH,
    lineCap = STYLE_DEFAULT_LINE_CAP,
  } = style;

  const rotateScale = scaleLinear()
    .domain([-1, 1])
    .range([0, 360]);

  return ({
    ctx,
    customValue = 0,
    height,
    width,
  }) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    const gridWidth = lineLength * 1.5 + padding;
    const columns = Math.floor(width / (lineLength + padding));
    const rows = Math.floor(height / (lineLength + padding));

    for (let y = 0; y < rows; y += 1) {
      const yPos = y * gridWidth + lineLength;
      for (let x = 0; x < columns; x += 1) {
        const xPos = x * gridWidth + lineLength;
        const random = simplex.noise3D(
          x * noise.x,
          y * noise.y,
          customValue * noise.custom,
        );

        const deg = rotateScale(random);

        ctx.save();
        ctx.translate(xPos, yPos);
        ctx.rotate((Math.PI / 180) * deg);
        ctx.translate(-xPos, -yPos);
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.lineTo(xPos + lineLength, yPos + lineLength);
        ctx.stroke();
        ctx.restore();
      }
    }
  };
};

export default makeBaseFunction;
