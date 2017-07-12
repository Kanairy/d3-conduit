import React from 'react';
import { select } from 'd3-selection';
import propTypes from 'prop-types';
import { generate } from 'shortid';

// d3Conduit creates a mounting point and emulates a react-like
// render and update pattern. The initFn should handle the initial
// draw (axes, labels), while the renderFn will handle D3 lifecycle
// actions, like data entry, exit and update. The update and render
// functions are called internally with a reference to the dom node created
// by react. See comments in relevant functions for further comments on the
// expected behaviour. d3Conduit should serve as a separator so that any
// D3 code written will not care that it exists in a react context.
const d3Conduit = (initFn, renderFn, options) => {
  var _class, _temp;

  return _temp = _class = class D3Container extends React.Component {

    constructor(props) {
      super(props);
      this.width = options.width;
      this.height = options.height;
      this.options = options;
      // assign an id so that makeResponsiveSVG can target and
      // responsively resize the svg.
      this.id = generate();
      this.makeResponsiveSVG = this.makeResponsiveSVG.bind(this);

      this.state = {
        data: this.props.data
      };
    }

    shouldComponentUpdate() {
      // this should prevent the render function ever being called
      // after initial mount.
      return false;
    }

    componentDidMount() {
      // initialisation of axes and labels
      initFn(this.node, this.state.data, options);
      // call render once for initial draw of data
      renderFn(this.node, this.state.data, options);
      select(this.node).call(this.makeResponsiveSVG);
    }

    componentWillUpdate({ data }) {
      // changes in data will cause a re-render through the provided D3 render
      // function, and not of the component through the render function.
      this.setState({ data }, () => {
        renderFn(this.node, this.state.data, options);
        return;
      });
    }

    componentWillUnmount() {
      // the d3 .remove() function should handle clean-up of all attached
      // nodes and listeners.
      select(this.node).remove();
    }

    makeResponsiveSVG(svg) {
      // sets viewBox and preserveAspectRatio, as per convention used in D3.
      const container = select(svg.node().parentNode);
      const width = parseInt(svg.style('width'), 0);
      const height = parseInt(svg.style('height'), 0);
      const aspect = width / height;

      const resize = () => {
        const targetWidth = parseInt(container.style('width'), 0);
        svg.attr('width', targetWidth).attr('height', Math.round(targetWidth / aspect));
      };

      svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMinYMid').call(resize);

      select(window).on(`resize.${svg.attr('id')}`, resize);
    }

    render() {
      // unlike regular react components, this render function
      // shoud only ever be called a single time.
      const props = {
        ref: node => {
          this.node = node;
          return;
        },
        className: this.props.className || null,
        width: this.width,
        height: this.height,
        id: this.id
      };

      return React.createElement(
        'div',
        { className: 'd3-container' },
        React.createElement('svg', props)
      );
    }
  }, _class.propTypes = {
    data: propTypes.oneOfType([propTypes.arrayOf(propTypes.object), propTypes.array, propTypes.object]),
    className: propTypes.string
  }, _class.displayName = options.displayName, _temp;
};

export default d3Conduit;