import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { max, range } from 'd3-array';
import { line as d3Line, area as d3Area, curveMonotoneX } from 'd3-shape';
import { randomUniform } from 'd3-random';

const initFunc = (node, data, options) => {
  const margin = options.margin;
  const width = options.width - margin.left - margin.right;
  const height = options.height - margin.bottom;

  // // The number of datapoints
  const n = 21;

  // 5. X scale will use the index of our data
  const xScale = scaleLinear()
      .domain([0, n-1]) // input
      .range([0, width]); // output

  // const xScale = scaleLinear()
  //   .range([0, width])
  //   .domain([0, max(data, d => d.totalOpportunities)]);

  // 6. Y scale will use the randomly generate number 
  var yScale = scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

// gridlines in y axis function
  function makeYGridlines() {		
    return axisLeft(yScale)
        .ticks(5)
  }

  // // 7. d3's line generator
  const line = d3Line()
    .x((d, i) => xScale(i)) // set the x values for the line generator
    .y((d) => yScale(d.y)) // set the y values for the line generator 
    .curve(curveMonotoneX) // apply smoothing to the line

  var area = d3Area()
    .x(function(d, i) { return xScale(i); })
    .y0(height)
    .y1(function(d) { return yScale(d.y); })
    .curve(curveMonotoneX) // apply smoothing to the line

  // // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
  var dataset = range(n).map((d) => { return {"y": randomUniform(1)() } })


  const svg = select(node)
    .append('svg')
    .attr('class', 'viewport')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(xScale)); // Create an axis component with d3.axisBottom

  svg.append("g")
      .attr("class", "y axis")
      .call(axisLeft(yScale)); // Create an axis component with d3.axisLeft

  svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", area); // 11. Calls the line generator 

  svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

  svg.selectAll(".dot")
      .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d, i) { return xScale(i) })
      .attr("cy", function(d) { return yScale(d.y) })
      .attr("r", 5);

      svg.append("g")			
      .attr("class", "grid")
      .call(makeYGridlines()
          .tickSize(-width)
          .tickFormat("")
      )


  // const yScale = scaleBand()
  //   .domain(data.map(d => d.causeName))
  //   .rangeRound([height, 0])
  //   .padding(0.3);

  // const xAxis = axisBottom(xScale)
  //   .ticks(5).tickFormat(d => d).tickSizeInner([-height])

  // const yAxis = axisLeft(yScale);

  // const svg = select(node)
  //   .append('svg')
  //   .attr('class', 'viewport')
  //   .attr('width', width + margin.left + margin.right)
  //   .attr('height', height + margin.top + margin.bottom)
  //   .append('g')
  //   .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // svg
  //   .append('g')
  //   .attr('class', 'x-axis')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(xAxis)

  // svg
  //   .append('g')
  //   .attr('class', 'y-axis')
  //   .call(yAxis)

};

export default initFunc;
