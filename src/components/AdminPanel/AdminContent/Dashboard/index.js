import React from 'react';

import {
	FlexCenterContainer,
	LineChartsContainer,
} from 'components/AdminPanel/Containers';

import Total from './Total';
import LineChart from './LineChart';

import {
	totalOrdersSettings,
	totalUsersSettings,
	totalClientsSettings,
	chartSalesYear,
	chartSalesMonth,
	chartOrdersYear,
	chartOrdersMonth,
} from 'utils/lineChartsData';
const Dashboard = () => {
	return (
		<>
			<FlexCenterContainer>
				<Total {...totalOrdersSettings} />
				<Total {...totalClientsSettings} />
				<Total {...totalUsersSettings} />
			</FlexCenterContainer>
			<LineChartsContainer>
				<LineChart {...chartSalesYear} />
				<LineChart {...chartSalesMonth} />
				<LineChart {...chartOrdersYear} />
				<LineChart {...chartOrdersMonth} />
			</LineChartsContainer>
		</>
	);
};

export default Dashboard;
