import React, { useState } from 'react';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAdminAllOrders } from 'utils/firebaseGetters';
import { useApi } from 'contexts/APIContext';

import {
	MainContainer,
	LoaderContainer,
} from 'components/Admin/Containers';
import Loader from 'components/Loader';
import Search from 'components/FilterGroup/Search';
import Button from 'components/Button';
import DeleteModal from 'components/DeleteModal';
import { Alert } from 'components/Alert';
import Status from 'components/Status';
import {
	AllCheckerCheckbox,
	Checkbox,
	CheckboxGroup,
} from '@createnl/grouped-checkboxes';
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
} from 'components/Table/TableElements';
import { useHistory } from 'react-router-dom';
import { ListDialogBox, ListDialogBoxNote } from './ListElements';
import {
	SettingsIcon,
	ArrowsFilterIcon,
	ArrowDownFilterIcon,
	ArrowUpFilterIcon,
	CashIcon,
	CreditCardIcon,
} from 'components/Admin/Icons';
import { AnimatePresence } from 'framer-motion';
const List = () => {
	const { data, loading } = useFirestoreQuery(getAdminAllOrders());
	const { deleteOrders } = useApi();
	const history = useHistory();
	const [query, setQuery] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [sortStatus, setSortStatus] = useState(1);
	const [showDialogBox, setShowDialogBox] = useState(false);
	const [amountToDelete, setAmountToDelete] = useState(0);
	const [open, setOpen] = useState(false);
	const [ordersToDelete, setOrdersToDelete] = useState([]);

	const giveDateSpan = (timestamp) => {
		const a = new Date(timestamp);
		let string = a.toLocaleString('pl-PL', { dateStyle: 'short' });
		return (
			<span>
				{string}
				<br />
				{a.getHours()}:
				{a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()}
			</span>
		);
	};

	const linkToOrder = (id) => {
		history.push(`/admin/orders/${id}`);
	};

	const handleStatus = () => {
		if (sortStatus === 3) {
			setSortStatus(1);
		} else {
			setSortStatus((prevStatus) => prevStatus + 1);
		}
	};

	const filterStatus = (a, b) => {
		if (sortStatus === 1) {
			return true;
		} else if (sortStatus === 2) {
			return a.step - b.step;
		} else if (sortStatus === 3) {
			return b.step - a.step;
		}
	};

	const onCheckboxChange = (checkboxes) => {
		const checked = checkboxes.filter((el) => el.checked);
		setAmountToDelete(checkboxes.filter((el) => el.checked).length);
		setOrdersToDelete(checked);
		if (checked.length > 0) {
			setShowDialogBox(true);
		} else {
			setShowDialogBox(false);
		}
	};

	const renderIcon = () => {
		if (sortStatus === 1) {
			return null;
		} else if (sortStatus === 2) {
			return React.createElement(ArrowUpFilterIcon);
		} else if (sortStatus === 3) {
			return React.createElement(ArrowDownFilterIcon);
		}
	};
	return (
		<>
			<DeleteModal
				input={amountToDelete}
				toDelete={ordersToDelete}
				open={open}
				setOpen={setOpen}
				setShowSuccess={setShowSuccess}
				asyncFunction={deleteOrders}
				mainText="Delete these orders?"
				secondText="Orders amount"
				description="these orders"
			/>
			<MainContainer
				display="inline-block"
				minwidth=""
				minheight="40rem"
			>
				{showSuccess && (
					<Alert success right="1rem" top="1rem">
						Order deleted!
					</Alert>
				)}

				<Search
					setQuery={setQuery}
					width="20rem"
					placeholder="Search by ID"
				/>

				<AnimatePresence>
					{showDialogBox && (
						<ListDialogBox
							initial={{
								opacity: 0,
								x: 100,
								transition: { duration: 0.3 },
							}}
							animate={{
								opacity: 1,
								x: 0,
								transition: { duration: 0.1 },
							}}
							exit={{
								opacity: 0,
								x: 100,
								transition: { duration: 0.1 },
							}}
						>
							<ListDialogBoxNote>
								Orders checked: <strong>{amountToDelete}</strong>
							</ListDialogBoxNote>
							<Button
								marginleft="auto"
								onClick={() => setOpen((prevOpen) => !prevOpen)}
							>
								Delete
							</Button>
						</ListDialogBox>
					)}
				</AnimatePresence>

				<Table display="inline-block">
					<CheckboxGroup onChange={onCheckboxChange}>
						<TableBody>
							<TableRow backgroundColor="#93949417" fontW="bold">
								<TableCell width="20rem">
									<AllCheckerCheckbox className="checkbox-group" />
									ID
								</TableCell>
								<TableCell width="20rem" center>
									Date
								</TableCell>
								<TableCell center pointer onClick={handleStatus}>
									{renderIcon()}
									Status
									<ArrowsFilterIcon />
								</TableCell>
								<TableCell width="14rem" center>
									Payment
								</TableCell>
								<TableCell width="14rem" center>
									Quantity
								</TableCell>
								<TableCell width="13rem" center>
									Total
								</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>

							{data &&
								data
									.filter((el) => el.orderId.includes(query))
									.sort((a, b) => filterStatus(a, b))
									.map((el, i) => (
										<TableRow key={i}>
											<TableCell>
												<Checkbox
													className="checkbox-group"
													value={`${el.id}`}
												/>
												{el.orderId}
											</TableCell>
											<TableCell center>
												{giveDateSpan(el.date)}
											</TableCell>
											<TableCell center>
												<Status step={el.step} />
											</TableCell>
											<TableCell width="8rem" center>
												{el.payment === 1 ? (
													<CreditCardIcon />
												) : (
													<CashIcon />
												)}
											</TableCell>
											<TableCell center>
												{' '}
												{el.orderInfo.reduce((a, b) => {
													return a + b.quantity;
												}, 0)}
											</TableCell>

											<TableCell width="8rem" center>
												${el.totalPrice}
											</TableCell>
											<TableCell center>
												<SettingsIcon
													onClick={() => linkToOrder(el.orderId)}
												/>
											</TableCell>
										</TableRow>
									))}
						</TableBody>
					</CheckboxGroup>
				</Table>
				{loading && (
					<LoaderContainer height="30rem">
						<Loader primary />
					</LoaderContainer>
				)}
			</MainContainer>
		</>
	);
};

export default List;
