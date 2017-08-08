import d3Conduit from '../../src/d3Conduit';
import initFunc from './initFunc';
import renderFunc from './renderFunc';

const HorizontalBarChart = d3Conduit(initFunc, renderFunc, {
  displayName: 'horizontalBarChart',
});

export default HorizontalBarChart;
