import styled from 'styled-components/macro';

export const MainContainer = styled.div`
	background-color: var(--color-white);
	padding: 1.5rem;
	border-radius: 5px;
	min-width: 80%;
	margin-right: 2rem;
	box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
	position: relative;
`;

export const FullWidthContainer = styled.div`
	border-radius: 5px;
	/* padding: 1.5rem; */
	overflow: hidden;
	margin-right: 2rem;
	box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
	background-color: var(--color-white);
	margin-bottom: 2rem;
	display: flex;
	/* align-items: center; */
`;

export const EditContainer = styled.div`
	position: relative;
	background-color: var(--color-white);
	padding: 1.5rem;
	border-radius: 5px;
	max-width: 80rem;
	box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
	overflow: hidden;
`;

export const ProgressContainer = styled.div`
	margin: 1rem 0;
`;

export const TotalContainer = styled.div`
	flex: 0 0 30.333%;
	max-width: 30.333%;
	padding: 1.8rem;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: var(--color-grey-dark);
	border-radius: 5px;
	box-shadow: 0 0.1rem 1rem rgb(0 0 0 / 10%);
`;

export const FlexCenterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: 2rem;
`;

export const LineChartContainer = styled.div`
	/* margin-top: 2rem; */
	border-radius: 5px;
	box-shadow: 0 0.1rem 1rem rgb(0 0 0 / 10%);
	padding: 1.8rem;
	background-color: #fff;
	/* width: 25%; */

	border-bottom: 3px solid ${(props) => props.color};
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const LineChartsContainer = styled.div`
	margin-top: 2rem;
	margin-right: 2rem;
	display: grid;
	width: 49%;
	grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
	grid-column-gap: 2rem;
	grid-row-gap: 2rem;
`;
