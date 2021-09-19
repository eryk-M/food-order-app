import styled from 'styled-components/macro';

import { TiTick } from 'react-icons/ti';

import { BiDollarCircle } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { HiOutlineMinusCircle } from 'react-icons/hi';
export const TickIcon = styled(TiTick)`
	font-size: 1.8rem;
	fill: var(--color-green);
`;

export const SaleIcon = styled(BiDollarCircle)`
	font-size: 1.8rem;
	fill: var(--color-secondary);
`;

export const CrossIcon = styled(ImCross)`
	font-size: 1.8rem;
	fill: var(--color-red);
`;

export const MinusIcon = styled(HiOutlineMinusCircle)`
	font-size: 1.5rem;
	color: var(--color-red);
	cursor: pointer;
	vertical-align: middle;
	margin-left: 1rem;
`;
