import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

import HorizontalBarChart from './HorizontalBarChart'
import HorizontalBarChartNoDimensions from './HorizontalBarChart/noDimensions'
import HorizontalBarChartDynamic from './HorizontalBarChart/dynamic'

const sampleData = [
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

storiesOf('D3Conduit', module)
  .add('provided dimensions', () => <HorizontalBarChart data={sampleData} />)
  .add('no dimensions', () => <HorizontalBarChartNoDimensions data={sampleData} />)
  .add('dynamic data updates', () => <HorizontalBarChartDynamic />)