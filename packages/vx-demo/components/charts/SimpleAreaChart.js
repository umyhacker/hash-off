import React from 'react';
import Group from '@vx/group';
import Axis from '@vx/axis';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import Shape from '@vx/shape';
import Grid from '@vx/grid';
import Text from '@vx/text';
import Pattern from '@vx/pattern';
import Gradient from '@vx/gradient';
import { extent, max } from 'd3-array';

function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

export default ({
  margin,
  data,
  width,
  height,
}) => {
  const stock = Mock.appleStock;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // accessors
  const xStock = d => new Date(d.date);
  const yStock = d => d.close;

  // scales
  const xStockScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(stock, xStock),
  });
  const yStockScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(stock, yStock)],
    nice: true,
  });

  return (
    <svg height={height} width={width}>
      <Gradient.OrangeRed id="pinkblue" />
      <Group top={margin.top} left={margin.left}>
        <Grid.Rows
          scale={yStockScale}
          width={xMax}
          strokeDasharray="2,2"
          numTicks={numTicksForHeight(height)}
        />
        <Shape.AreaClosed
          data={stock}
          xScale={xStockScale}
          yScale={yStockScale}
          x={xStock}
          y={yStock}
          strokeWidth={2}
          stroke={'url(#pinkblue)'}
          fill={'url(#pinkblue)'}
        />
      </Group>
      <Axis.AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xStockScale}
        numTicks={numTicksForWidth(width)}
        label={'date'}
      />
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yStockScale}
        numTicks={numTicksForHeight(height)}
        label={'close price ($)'}
        hideAxisLine
        hideTicks
        hideZero
      />
    </svg>
  );
}
