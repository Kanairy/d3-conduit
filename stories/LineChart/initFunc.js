import { axisBottom, axisLeft } from 'd3-axis'
import { transition } from 'd3-transition'
import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { easeCubic } from 'd3-ease'
import { max, range } from 'd3-array'
import { line as d3Line, area as d3Area, curveMonotoneX } from 'd3-shape'
import { randomUniform } from 'd3-random'

const initFunc = (node, data, options) => {
  const margin = options.margin
  const width = options.width - margin.left - margin.right
  const height = options.height - margin.bottom

  const TRANSITION_DURATION = 400
  const TRANSITION_DELAY = 425

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, data.length])

  const yScale = scaleLinear()
    .range([height, 0])
    .domain([0, max(data, d => d.hours) + 1])

  const makeYGridlines = () => axisLeft(yScale)

  const t = transition()
    .ease(easeCubic)
    .duration(TRANSITION_DURATION)

  const line = d3Line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.hours))
    .curve(curveMonotoneX)

  const svg = select(node)
    .append('svg')
    .attr('class', 'viewport')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('class', 'graph')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const area = d3Area()
    .x((d, i) => xScale(i))
    .y0(height)
    .y1(d => yScale(d.hours))
    .curve(curveMonotoneX)

  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(axisBottom(xScale))

  svg.append('g')
    .attr('class', 'y-axis')
    .call(axisLeft(yScale))

  svg.append('path')
    .datum(data)
    .style('transform', 'scaleY(0)')
    .style('transform-origin', '250px 250px')
    .transition(t)
    .attr('class', 'line')
    .style('fill', 'none')
    .style('stroke', 'blue')
    .style('stroke-width', '3px')
    .style('transform', 'scaleY(1)')
    .attr('d', line)

  svg.append('path')
    .datum(data)
    .style('transform', 'scaleY(0)')
    .style('transform-origin', '250px 250px')
    .style('fill-opacity', '0')
    .transition(t)
    .attr('class', 'area')
    .style('fill-opacity', '0.2')
    .style('transform', 'scaleY(1)')
    .attr('d', area)

  svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cy', height)
    .attr('cx', (d, i) => xScale(i))
    .attr('class', 'dot')
    .transition(t)
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', d => yScale(d.hours))
    .attr('r', 5)

  svg.append('g')
    .attr('class', 'grid')
    .call(
      makeYGridlines()
      .tickSize(-width)
      .tickFormat('')
    )

}

export default initFunc
