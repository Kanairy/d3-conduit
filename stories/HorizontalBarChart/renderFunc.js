import { transition } from 'd3-transition';
import { easeCubic } from 'd3-ease';
import { stack } from 'd3-shape';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
// eslint-disable-next-line no-unused-vars
import { select, event, mouse } from 'd3-selection';

const renderFunc = (node, data, options) => {
  const margin = options.margin;
  const width = options.width - margin.left - margin.right;
  const height = options.height - margin.bottom;
  const TRANSITION_DURATION = 400;
  const TRANSITION_DELAY = 425;

  const t = transition()
    .ease(easeCubic)
    .duration(TRANSITION_DURATION);

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, max(data, d => d.totalOpportunities)]);

  const yScale = scaleBand()
    .domain(data.map(d => d.causeName))
    .rangeRound([height, 0])
    .padding(0.1);

  const slices = stack()
    .keys(['male', 'female', 'other'])(data.map(d => {
      return Object.assign({}, d.genders, { causeName: d.causeName });
    }));

  const boundSlices = slices.map(slice => {
    return select(node)
      .select('g')
      .selectAll(`.${slice.key}`)
      .data(slice, d => d.causeName);
  });

  boundSlices.forEach(bind => {
    bind
      .exit()
      .transition(t)
      .attr('x', d => xScale(d[0]))
      .attr('width', 0)
      .remove();
    return;
  });

  boundSlices.forEach(bind => {
    bind
      .transition(t)
      .delay(TRANSITION_DELAY)
      .attr('x', d => xScale(d[0]))
      .attr('width', d => xScale(d[1]) - xScale(d[0]));
    return;
  });

  boundSlices.forEach((bind, i) => {
    bind
      .enter()
      .append('rect')
        .attr('x', d => xScale(d[0]))
        .attr('class', `${slices[i].key}`)
        .attr('height', yScale.bandwidth())
        .attr('y', d => yScale(d.data.causeName))
        .attr('width', 0)
        .transition(t)
        .delay(TRANSITION_DELAY * i)
        .attr('width', d => xScale(d[1]) - xScale(d[0]));
    return;
  });
};

export default renderFunc;
