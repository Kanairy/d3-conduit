import React from 'react'
import d3Conduit from '../../src/d3Conduit'
import initFunc from './initFunc'
import renderFunc from './renderFunc'


const sampleData1 = [
	{
    totalOpportunities: 100,
    genders: {
      male: 55,
      female: 35,
      other: 10
    },
		"causeName": "Durian",
	},
	{
    totalOpportunities: 120,
    genders: {
      male: 35,
      female: 55,
      other: 30
    },
		"causeName": "Banana",
	},
	{
    totalOpportunities: 150,
    genders: {
      male: 25,
      female: 95,
      other: 30
    },
		"causeName": "Cheese",
	},
]

const sampleData2 = [
	{
    totalOpportunities: 50,
    genders: {
      male: 10,
      female: 35,
      other: 5
    },
		"causeName": "Durian",
	},
	{
    totalOpportunities: 200,
    genders: {
      male: 100,
      female: 60,
      other: 40
    },
		"causeName": "Banana",
	},
	{
    totalOpportunities: 90,
    genders: {
      male: 50,
      female: 35,
      other: 5
    },
		"causeName": "Cheese",
	},
]

const HorizontalBarChart = d3Conduit(initFunc, renderFunc, {
  displayName: 'horizontalBarChart',
  width: 800,
  height: 400,
  margin: {
    top: 120,
    right: 50,
    bottom: 150,
    left: 120,
  },
})

class Wrapper extends React.Component {
  state = {
    toggled: false,
    data: sampleData1
  }

  toggleData = () => {
    this.setState({
      data: this.state.toggled ? sampleData2 : sampleData1,
      toggled: !this.state.toggled
    });
  }
  render() {
    return <div>
      <button onClick={this.toggleData}>Toggle Data</button>
      <HorizontalBarChart data={this.state.data} />
    </div>
  }
}

export default Wrapper
