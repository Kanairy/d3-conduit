import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { max } from 'd3-array';

const opportunitiesReportInit = (node, data, options) => {
  const margin = options.margin;
  const width = options.width - margin.left - margin.right;
  const height = options.height - margin.bottom;

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, max(data, d => d.totalOpportunities)]);

  const yScale = scaleBand()
    .domain(data.map(d => d.causeName))
    .rangeRound([height, 0])
    .padding(0.3);

  const xAxis = axisBottom(xScale)
    .ticks(5).tickFormat(d => d).tickSizeInner([-height])

  const yAxis = axisLeft(yScale);

  const svg = select(node)
    .append('svg')
    .attr('class', 'viewport')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  svg
    .append('g')
    .attr('class', 'y-axis')
    .call(yAxis)

};

export default opportunitiesReportInit;
