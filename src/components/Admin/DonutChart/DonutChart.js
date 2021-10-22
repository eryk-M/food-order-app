import React from 'react';

import Chart from 'react-apexcharts';

import { DonutChartContainer, Loader } from 'components';
import {
	LineChartTop,
	LineChartP,
	LineChartSpan,
} from '../LineChart/LineChartElements';

import { DonutChartWrapper } from './DonutChartElements.js';
import { useWindowSize } from 'hooks';
import LazyLoad from 'react-lazyload';

export const DonutChart = () => {
	const { width } = useWindowSize();

	const options = {
		labels: ['Burgers', 'Chicken', 'Fries', 'Drinks'],
		chart: {
			width: '100%',
			type: 'pie',
			animations: {
				enabled: false,
			},
		},
		plotOptions: {
			pie: {
				size: width <= 640 ? 100 : '',
			},
		},
		markers: {
			size: 0,
		},
		dataLabels: {
			enabled: false,
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
			<LazyLoad
				height={300}
				placeholder={<Loader primary margincenter high />}
			>
				<DonutChartWrapper>
					<Chart
						options={options}
						series={series}
						type="pie"
						width={donutWidth(width)}
						height="700"
					/>
				</DonutChartWrapper>
			</LazyLoad>
		</DonutChartContainer>
	);
};
