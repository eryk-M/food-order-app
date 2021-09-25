import styled from 'styled-components/macro';

import { TiTick } from 'react-icons/ti';
import { BiDollarCircle, BiCreditCardAlt } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { HiOutlineMinusCircle, HiOutlineCash } from 'react-icons/hi';
import {
	RiArrowUpDownLine,
	RiArrowUpLine,
	RiArrowDownLine,
} from 'react-icons/ri';
import {
	FiEdit,
	FiPlus,
	FiAlertTriangle,
	FiSettings,
} from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
export const EditBigIcon = styled(FiEdit)`
	position: absolute;
	font-size: 12rem;
	top: 1rem;
	right: 1rem;
	transform: rotate(0deg);
	color: var(--color-grey-light);
	background-color: white;
`;

export const PlusBigIcon = styled(FiPlus)`
	position: absolute;
	font-size: 12rem;
	top: -1rem;
	right: -1rem;
	transform: rotate(0deg);
	color: var(--color-grey-light);
	background-color: white;
`;

export const AlertIcon = styled(FiAlertTriangle)`
	vertical-align: middle;
	margin-right: 1rem;
	font-size: 2.4rem;
`;

export const InfoIcon = styled(AiOutlineInfoCircle)`
	font-size: 5.4rem;
	color: #fff;
	vertical-align: middle;
`;

export const SettingsIcon = styled(FiSettings)`
	font-size: 2.4rem;
	vertical-align: middle;
	color: var(--color-grey-dark);
	cursor: pointer;
	transition: 0.5s transform;
	backface-visibility: hidden;
	&:hover {
		transform: rotate(180deg);
	}
`;

export const ArrowsFilterIcon = styled(RiArrowUpDownLine)`
	vertical-align: middle;
	margin-left: 0.5rem;
	font-size: 1.8rem;
`;

export const ArrowDownFilterIcon = styled(RiArrowDownLine)`
	vertical-align: middle;
	margin-right: 0.5rem;
	font-size: 1.8rem;
`;

export const ArrowUpFilterIcon = styled(RiArrowUpLine)`
	vertical-align: middle;
	margin-right: 0.5rem;
	font-size: 1.8rem;
`;

export const CreditCardIcon = styled(BiCreditCardAlt)`
	font-size: 3rem;
	vertical-align: middle;
	color: var(--color-secondary);
`;

export const CashIcon = styled(HiOutlineCash)`
	color: var(--color-green);
	font-size: 3rem;
	vertical-align: middle;
`;
