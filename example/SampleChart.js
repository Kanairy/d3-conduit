import d3Conduit from '../dist/d3Conduit';
import { sampleInit, sampleRender } from './drawFunctions';

const SampleChart = d3Conduit(sampleInit, sampleRender, {
  displayName: 'sampleReport',
  width: 800,
  height: 300,
  margin: {
    top: 120,
    right: 50,
    bottom: 150,
    left: 50,
  },
});
