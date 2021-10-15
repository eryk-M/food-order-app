import styled from 'styled-components/macro';

import { TiTick, TiDeleteOutline } from 'react-icons/ti';
import { BiDollarCircle, BiCreditCardAlt } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { HiOutlineMinusCircle, HiOutlineCash } from 'react-icons/hi';
import {
	RiArrowUpDownLine,
	RiArrowUpLine,
	RiArrowDownLine,
	RiDragMove2Fill,
} from 'react-icons/ri';
import {
	FiEdit,
	FiPlus,
	FiAlertTriangle,
	FiSettings,
} from 'react-icons/fi';
import {
	AiOutlineInfoCircle,
	AiOutlinePrinter,
} from 'react-icons/ai';
import { MdDragHandle } from 'react-icons/md';

import { device } from 'utils/breakpoints';

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
	@media only screen and (max-width: 580px) {
		font-size: 8rem;
	}
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
	@media ${device.mobileL} {
		font-size: 4rem;
	}
`;

export const SettingsIcon = styled(FiSettings)`
	font-size: 2.4rem;
	vertical-align: middle;
	color: var(--color-grey-dark);
	cursor: pointer;
	transition: 0.5s transform;
	backface-visibility: hidden;
	margin-right: 1rem;
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

export const PrinterIcon = styled(AiOutlinePrinter)`
	font-size: 3rem;
	vertical-align: middle;
	margin-right: 1rem;
	cursor: pointer;
	@media ${device.mobileM} {
		margin-right: 0;
	}
`;

export const DragIcon = styled(RiDragMove2Fill)`
	font-size: 8rem;
	opacity: 0.3;
`;

export const CrossDeleteIcon = styled(TiDeleteOutline)`
	font-size: 4rem;
	cursor: pointer;
	vertical-align: middle;
	color: var(--color-grey-dark);
	display: inline-block;
	position: absolute;
	right: 1rem;
	top: 0.5rem;
`;

export const DragLinesIcon = styled(MdDragHandle)`
	font-size: 2rem;
	margin-right: 1rem;
	vertical-align: middle;
`;
