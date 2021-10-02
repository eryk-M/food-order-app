import styled from 'styled-components/macro';

export const MainContainer = styled.div`
	display: ${(props) => props.display};
	background-color: var(--color-white);
	padding: 1.5rem;
	border-radius: 5px;
	min-width: ${(props) => props.minwidth ?? '80%'};
	margin-right: 2rem;
	margin: ${(props) => (props.center ? '0 auto' : '0 2rem 0 0')};
	box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
	position: relative;
	width: ${(props) => props.width};
	max-width: ${(props) => props.maxwidth ?? ''};
	min-height: ${(props) => props.minheight ?? ''};
`;

export const FullWidthContainer = styled.div`
	border-radius: 5px;
	overflow: hidden;
	margin-right: 2rem;
	box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
	background-color: var(--color-white);
	margin-bottom: 2rem;
	display: flex;
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
	justify-content: ${(props) =>
		props.center ? 'center' : 'space-between'};
	align-items: center;
	margin-right: 2rem;
`;

export const JustifyCenterContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const LineChartContainer = styled.div`
	/* margin-top: 2rem; */
	border-radius: 5px;
	box-shadow: 0 0.1rem 1rem rgb(0 0 0 / 10%);
	padding: 1.8rem;
	background-color: #fff;
	border-bottom: 3px solid ${(props) => props.color};
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const LineChartsContainer = styled.div`
	margin-right: 2rem;
	display: grid;
	width: 49%;
	grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
	grid-column-gap: 2rem;
	grid-row-gap: 2rem;
	@media only screen and (max-width: 1353px) {
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(50rem, 2fr));
	}
	@media only screen and (max-width: 1130px) {
		grid-template-columns: repeat(auto-fit, minmax(35rem, 2fr));
	}
`;

export const DonutChartContainer = styled.div`
	border-radius: 5px;
	box-shadow: 0 0.1rem 1rem rgb(0 0 0 / 10%);
	padding: 1.8rem;
	background-color: #fff;
	height: 100%;
	@media only screen and (max-width: 1575px) {
		margin-top: -2rem;
	}
`;
export const ChartsWrapper = styled.div`
	display: flex;
	margin-top: 2rem;
	margin-right: 2rem;
	@media only screen and (max-width: 1353px) {
		flex-direction: column;
	}
`;

export const DashBoardGridContainer = styled.div`
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr) 0;
	grid-template-rows: repeat(2, 1fr) repeat(3, 0);
	grid-gap: 2rem;
	@media only screen and (max-width: 1575px) {
		grid-template-rows: repeat(2, 1fr) 0 repeat(2, 1fr);
		grid-gap: 2rem;
	}
`;

export const GridLine1 = styled.div`
	grid-area: 1 / 1 / 2 / 2;
	@media only screen and (max-width: 1575px) {
		grid-area: 1 / 1 / 2 / 3;
	}
`;
export const GridLine2 = styled.div`
	grid-area: 1 / 2 / 2 / 3;
	@media only screen and (max-width: 1575px) {
		grid-area: 1 / 3 / 2 / 5;
	}
`;
export const GridLine3 = styled.div`
	grid-area: 2 / 1 / 3 / 2;
	@media only screen and (max-width: 1575px) {
		grid-area: 2 / 1 / 3 / 3;
	}
`;

export const GridLine4 = styled.div`
	grid-area: 2 / 2 / 3 / 3;
	@media only screen and (max-width: 1575px) {
		grid-area: 2 / 3 / 3 / 5;
	}
`;

export const GridDonut = styled.div`
	grid-area: 1 / 3 / 3 / 5;
	@media only screen and (max-width: 1575px) {
		grid-area: 4 / 1 / 6 / 5;
	}
`;

export const LoaderContainer = styled.div`
	height: ${(props) => props.height};
	display: flex;
	align-items: center;
	justify-content: center;
`;
