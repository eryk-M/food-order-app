import React from 'react';

import Chart from 'react-apexcharts';

import { DonutChartContainer } from 'components/Admin/Containers';
import {
	LineChartTop,
	LineChartP,
	LineChartSpan,
} from '../LineChart/LineChartElements';

import { DonutChartWrapper } from './DonutChartElements.js';
const DonutChart = () => {
	const options = {
		labels: ['Burgers', 'Chicken', 'Fries', 'Drinks'],
		chart: {
			width: '100%',
			type: 'pie',
		},
		plotOptions: {
			pie: {
				// size: 1100,
			},
		},
	};

	const series = [44, 55, 41, 17];

	return (
		<DonutChartContainer>
			<LineChartTop>
				<LineChartP>Popularity</LineChartP>
				<LineChartSpan>Products by category</LineChartSpan>
			</LineChartTop>
			<DonutChartWrapper>
				<Chart
					options={options}
					series={series}
					type="pie"
					width="600"
					height="700"
				/>
			</DonutChartWrapper>
		</DonutChartContainer>
	);
};

export default DonutChart;
