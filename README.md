# D3Conduit

Simple Conduit to allow you to write pure D3 and render it as a component in your react app.

# How to Use

Install it:

`npm i -S d3conduit`

d3Conduit essentially hijacks the rendering portion of a react component and handles changes in data via two essential functions you pass to it: `init` and `render`.

You should implement them like this:

```js
// this function handles the initial draw of D3 data.
// it will only be called once by d3Conduit. The node argument
// is a reference to the dom node created by d3Conduit.
// As a general rule, this function should not be drawing anything
// relating to the data itself.
export const sampleInit = (node, data, options) => {
 
};

// this function will be called every time the data prop changes.
// it should implement the general update patter (update, enter, exit)
export const sampleRender = (node, data, options) => {

};
```

Now you need to create a conduit. To do that, call d3Conduit with your functions, as well as an options object that defines the dimensions and margins of the resulting graph. It will return a react component:

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

Now you can render this component anywhere in your app. It expects a `data` prop.

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


# License

MIT