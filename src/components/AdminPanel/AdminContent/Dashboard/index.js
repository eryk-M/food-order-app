import React from 'react';

import {
	FlexCenterContainer,
	LineChartsContainer,
	ChartsWrapper,
	DashBoardGridContainer,
	GridLine1,
	GridLine2,
	GridLine3,
	GridLine4,
	GridDonut,
} from 'components/AdminPanel/Containers';

import Total from './Total';
import LineChart from './LineChart';
import DonutChart from './DonutChart';
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
			<DashBoardGridContainer>
				<GridLine1>
					<LineChart {...chartSalesYear} />
				</GridLine1>
				<GridLine2>
					<LineChart {...chartSalesMonth} />
				</GridLine2>
				<GridLine3>
					<LineChart {...chartOrdersYear} />
				</GridLine3>
				<GridLine4>
					<LineChart {...chartOrdersMonth} />
				</GridLine4>
				<GridDonut>
					<DonutChart />
				</GridDonut>
			</DashBoardGridContainer>
			{/* <ChartsWrapper>
				<LineChartsContainer>
					<LineChart {...chartSalesYear} />
					<LineChart {...chartSalesMonth} />
					<LineChart {...chartOrdersYear} />
					<LineChart {...chartOrdersMonth} />
				</LineChartsContainer>
				<DonutChart />
			</ChartsWrapper> */}
		</>
	);
};

export default Dashboard;
