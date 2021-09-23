import React, { useState } from 'react';

import Chart from 'react-apexcharts';

import { LineChartContainer } from 'components/AdminPanel/Containers';
import {
	LineChartTop,
	LineChartP,
	LineChartSpan,
	LineChartWrapper,
} from './LineChartElements';
const LineChart = ({ array, days, color, text, span }) => {
	const [data] = useState(array);
	console.log(days);
	const options = {
		chart: {
			height: 350,
			width: 500,
			type: 'line',
			zoom: {
				enabled: true,
			},
			toolbar: {
				show: false,
			},
			background: { enabled: false },
		},
		grid: { show: false },
		stroke: {
			width: 3,
			curve: 'smooth',
		},
		colors: [color],
		fill: {
			colors: [color],
			type: 'solid',
		},

		legend: { show: false },
		xaxis: {
			show: false,
			categories: days,
			labels: {
				show: false,
				style: {
					fontSize: '5px',
				},
			},
			crosshairs: {
				show: true,
			},
		},
		tooltip: {
			enabled: true,
			enabledOnSeries: false,
			marker: {
				show: false,
			},
			x: {
				show: false,
			},
		},

		// xaxis: {},
		yaxis: {
			show: false,
			labels: { show: false },
		},
	};
	const series = [
		{
			name: '',
			data: data,
		},
	];
	return (
		<LineChartContainer color={color}>
			<LineChartTop>
				<LineChartP>{text}</LineChartP>
				<LineChartSpan>{span}</LineChartSpan>
			</LineChartTop>
			<LineChartWrapper>
				<Chart options={options} series={series} />
			</LineChartWrapper>
		</LineChartContainer>
	);
};

export default LineChart;
