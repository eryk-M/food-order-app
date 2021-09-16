import styled from 'styled-components/macro';

export const SideBarContainer = styled.div`
	width: 22%;
	margin-right: 5rem;
`;

export const SideBarItem = styled.li`
	padding: 1rem 2rem;
	font-size: 1.4rem;
	color: var(--color-grey-dark);
	/* font-weight: 700; */
	/* background-color: var(--color-primary); */
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
	}

	& svg {
		font-size: 3.5rem;
		vertical-align: middle;
		margin-right: 1rem;
		fill: rgb(164 163 162);
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
	}
`;

export const SideBarList = styled.ul`
	background-color: #f7f7f7;
	border-radius: 1rem;
	margin: 3rem 0;
	/* padding: 1rem 0; */
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
		}
	}
`;
