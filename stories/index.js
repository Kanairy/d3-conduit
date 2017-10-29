import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

// horizontal bar charts
import HorizontalBarChart from './HorizontalBarChart'
import HorizontalBarChartNoDimensions from './HorizontalBarChart/noDimensions'
import HorizontalBarChartDynamic from './HorizontalBarChart/dynamic'
// import LineChartDynamic from './LineChartDynamic/dynamic'

// curved line charts
import LineChart from './LineChart'

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

const sample2 = [{"id":"587c4d5eb83b1c5e92fb4c83","hours":0.25,"createdAt":"2017-01-16T04:34:38.948Z","approved":true,"__typename":"Timesheet"},{"id":"59b768b44d40190010de3e82","hours":2,"createdAt":"2017-09-12T04:55:16.081Z","approved":true,"__typename":"Timesheet"},{"id":"59b768b44d40190010de3e83","hours":2,"createdAt":"2017-09-12T04:55:16.081Z","approved":true,"__typename":"Timesheet"},{"id":"59b76c8f4d40190010de4153","hours":0,"createdAt":"2017-09-12T05:11:43.823Z","approved":true,"__typename":"Timesheet"},{"id":"59b76c8f4d40190010de4154","hours":0,"createdAt":"2017-09-12T05:11:43.823Z","approved":true,"__typename":"Timesheet"},{"id":"59b895e54d40190010de4dd9","hours":3,"createdAt":"2017-09-13T02:20:21.596Z","approved":true,"__typename":"Timesheet"},{"id":"59b895e54d40190010de4dda","hours":3,"createdAt":"2017-09-13T02:20:21.596Z","approved":true,"__typename":"Timesheet"},{"id":"59b895e54d40190010de4ddb","hours":3,"createdAt":"2017-09-13T02:20:21.596Z","approved":true,"__typename":"Timesheet"},{"id":"59b895e54d40190010de4ddc","hours":3,"createdAt":"2017-09-13T02:20:21.596Z","approved":true,"__typename":"Timesheet"},{"id":"59ed31fdcfd86d0010ce4490","hours":0.16666666666666666,"createdAt":"2017-10-23T00:04:13.872Z","approved":false,"__typename":"Timesheet"},{"id":"59ed31fdcfd86d0010ce4491","hours":0.16666666666666666,"createdAt":"2017-10-23T00:04:13.872Z","approved":false,"__typename":"Timesheet"}]

storiesOf('Horizontal Bar Chart', module)
  .add('provided dimensions', () => <HorizontalBarChart data={sampleData} />)
  .add('no dimensions', () => <HorizontalBarChartNoDimensions data={sampleData} />)
  .add('dynamic data updates', () => <HorizontalBarChartDynamic />)

storiesOf('Curved Line Chart', module)
  .add('provided dimensions', () => <LineChart data={sample2} />)