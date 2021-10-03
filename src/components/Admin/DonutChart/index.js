import React from 'react';

import Chart from 'react-apexcharts';

import { DonutChartContainer } from 'components/Admin/Containers';
import {
	LineChartTop,
	LineChartP,
	LineChartSpan,
} from '../LineChart/LineChartElements';

import { DonutChartWrapper } from './DonutChartElements.js';
import { useWindowSize } from 'hooks/useWindowSize';

const DonutChart = () => {
	const size = useWindowSize();

	const options = {
		labels: ['Burgers', 'Chicken', 'Fries', 'Drinks'],
		chart: {
			width: '100%',
			type: 'pie',
		},
		plotOptions: {
			pie: {
				size: size.width <= 640 ? 100 : '',
			},
		},
	};

	const series = [44, 55, 41, 17];

	// documentation on responsive option on apexcharts site not working!!!!!!!!!!!!!!!
	const donutWidth = (width) => {
		if (width > 640) {
			return '600';
		} else if (width > 520 && width <= 640) {
			return '500';
		} else if (width > 460 && width <= 520) {
			return '450';
		} else if (width > 360 && width <= 460) {
			return '350';
		} else if (width <= 360) {
			return '300';
		}
	};

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
					width={donutWidth(size.width)}
					height="700"
				/>
			</DonutChartWrapper>
		</DonutChartContainer>
	);
};

export default DonutChart;
