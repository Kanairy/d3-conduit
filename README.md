# React D3Conduit [![CircleCI](https://circleci.com/gh/HMAN1911/d3Conduit/tree/master.svg?style=svg)](https://circleci.com/gh/HMAN1911/d3Conduit/tree/master)

Simple Conduit to allow you to write pure D3 and render it as a component in your react app.

# How to Use

Install it:

`yarn add d3conduit`

or

`npm i -S d3conduit`

d3Conduit essentially hijacks the rendering portion of a react component and handles changes in data via two essential functions you pass to it: `init` and `render`.

[Examples](https://hman1911.github.io/d3Conduit/)

You should implement them like this:

```js
// This function handles the initial draw of D3 data.
// it will only be called once by d3Conduit. The node argument
// is a reference to the dom node created by d3Conduit.

// This is the ideal place to render any 'one time draw' items,
// like axes or labels.
export const sampleInit = (node, data, options) => {

};

// This function will be called every time the data prop changes.
// it should implement the general update patter (update, enter, exit).

// Take a look at the storybook and relating code to see examples
// of how to do this.
export const sampleRender = (node, data, options) => {

};
```

Now you need to create a conduit. To do that, call d3Conduit with your functions, as well as an optional `options` object. You can define anything you want in the options object, and it will be passed to you in both your `init` and `render` functions.

```js
import d3Conduit from 'd3conduit';
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
```

Now you can render this component anywhere in your app. It expects a single `data` prop. How you consume this prop is entirely up to you.

```js

const data = [
    {"area": "central ", "value": 18000},
    {"area": "Riverside ", "value": 17000},
    {"area": "Picton ", "value": 80000},
    {"area": "Everton ", "value": 55000},
    {"area": "Kensington ", "value": 100000},
    {"area": "Kirkdale", "value": 50000}
]

const App =() => (
  <div className="App-header">
    <SampleChart data={data}/>
  </div>
);
```

The render function you provided to d3Conduit will now be called every time the `data` prop changes.

Take a look in the `/stories` directory for an example of how to implement all of the above.

# License

MIT