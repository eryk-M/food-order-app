import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const SideBarContainer = styled.div`
	width: 22%;
	margin-right: 5rem;

	@media ${device.mobileL} {
		width: 90%;
		margin: 0 auto;
		display: flex;
	}
`;

export const SideBarItem = styled.li`
	padding: 1rem 2rem;
	font-size: 1.4rem;
	color: var(--color-grey-dark);
	position: relative;
	.icon-arrow {
		fill: black;
		font-size: 2.8rem;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: -0.5rem;
		z-index: 1;
		visibility: hidden;
	}
	&:after {
		content: '';
		display: block;
		position: absolute;
		right: -1.85rem;
		top: 0.5rem;
		height: 4.5rem;
		width: 4.5rem;
		border-radius: 1rem;
		transform: rotate(45deg);
		background-color: inherit;
		visibility: hidden;
	}
	&:not(:last-of-type) {
		border-bottom: 1px solid #ccc;
		@media ${device.mobileL} {
			border: none;
		}
	}

	& svg {
		font-size: 3.5rem;
		vertical-align: middle;
		margin-right: 1rem;
		fill: rgb(164 163 162);
		@media ${device.mobileL} {
			min-width: 3.5rem;
		}
		@media ${device.mobileM} {
			margin-right: 0;
		}
	}
	&:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
		font-weight: bold;
		cursor: pointer;
	}

	&:hover svg {
		fill: var(--color-white);
	}
	&:hover:after,
	&:hover .icon-arrow {
		visibility: visible;
		@media ${device.mobileL} {
			visibility: hidden;
		}
	}

	& span {
		@media ${device.mobileM} {
			display: none;
		}
	}
	@media ${device.mobileL} {
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const SideBarList = styled.ul`
	background-color: #f7f7f7;

	border-radius: 1rem;
	margin: 3rem 0;
	.active {
		background-color: var(--color-primary);
		color: var(--color-white);
		font-weight: bold;
		fill: var(--color-white);
		& svg {
			fill: white;
			visibility: visible;
		}
		&:after {
			visibility: visible;
			@media ${device.mobileL} {
				visibility: hidden;
			}
		}
		& .icon-arrow {
			@media ${device.mobileL} {
				visibility: hidden;
			}
		}
	}
	@media ${device.mobileL} {
		display: inline-flex;
		width: 92%;
		border-radius: 0;
		margin: 0 auto;
	}
`;
