import styled from 'styled-components/macro';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { device } from 'utils/breakpoints';

export const StoryContainer = styled.section`
	max-width: 116rem;
	margin: 10rem auto;
	display: flex;
	padding: 0 1rem;
	@media ${device.mobileL} {
		flex-direction: column;
	}
`;

export const StoryContent = styled.div`
	margin-right: 10rem;
	display: flex;
	flex-direction: column;
	@media ${device.tablet} {
		margin-right: 5rem;
	}
	@media ${device.mobileL} {
		margin: 2rem auto;
	}
`;

export const StoryP = styled.p`
	font-size: 2rem;
	line-height: 1.7;
`;

export const StoryDesc = styled.p`
	font-size: 1.4rem;
	line-height: 1.7;
	text-align: justify;
	margin: 2rem 0;
`;

export const StoryImage = styled(LazyLoadImage)`
	display: inline-block;
	height: 500px;

	@media ${device.tablet} {
		height: 400px;
	}
`;
export const StoryImageWrapper = styled.div`
	position: relative;
	height: 500px;
	&:before {
		content: '';
		position: absolute;
		height: 100%;
		width: 100%;
		bottom: -1rem;
		right: -1rem;
		background-color: var(--color-primary);
		z-index: -1;

		@media ${device.tablet} {
			height: 400px;
		}
	}
	@media ${device.tablet} {
		height: 400px;
	}
	@media ${device.mobileL} {
		display: inline-block;
		width: 33.3rem;
		margin: 0 auto;
		margin-top: 2rem;
	}
`;

export const StoryContact = styled.div`
	font-size: 1.6rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin-top: 2rem;
	width: 30rem;
	& svg {
		vertical-align: middle;
		font-size: 5rem;
		color: var(--color-primary);
		margin-right: 2rem;
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		padding: 1rem 0;
	}
`;

export const StoryContactWrapper = styled.div`
	margin-top: auto;
`;
