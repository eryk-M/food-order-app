import React, { useState, useEffect } from 'react';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAdminAllOrders } from 'utils/firebaseGetters';
import { useApi } from 'contexts/APIContext';

import Loader from 'components/Loader';
import Search from 'components/FilterGroup/Search';
import Button from 'components/Button';
import DeleteModal from 'components/DeleteModal';
import { Alert } from 'components/Alert';
import Status from 'components/Status';
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	TableCellHead,
} from 'components/Table/TableElements';
import { useHistory } from 'react-router-dom';
import {
	ListDialogBox,
	ListDialogBoxNote,
	ListContainer,
	MobileFilter,
	AllCheckerMobile,
	StatusMobile,
	ListCheckbox,
} from './ListElements';
import {
	SettingsIcon,
	ArrowsFilterIcon,
	ArrowDownFilterIcon,
	ArrowUpFilterIcon,
	CashIcon,
	CreditCardIcon,
} from 'components/Admin/Icons';
import { AnimatePresence } from 'framer-motion';
import Pagination from 'components/Pagination';
const List = () => {
	const { data, loading } = useFirestoreQuery(getAdminAllOrders());
	const { deleteOrders } = useApi();

	const history = useHistory();
	const [query, setQuery] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [sortStatus, setSortStatus] = useState(1);
	const [open, setOpen] = useState(false);
	const [ordersToDelete, setOrdersToDelete] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	const [orderState, setOrderState] = useState([]);

	useEffect(() => {
		if (data) {
			setOrderState(
				data.map((el) => {
					return {
						select: false,
						id: el.id,
						orderId: el.orderId,
						date: el.date,
						step: el.step,
						payment: el.payment,
						orderInfo: el.orderInfo,
						totalPrice: el.totalPrice,
					};
				})
			);
		}
	}, [data]);

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
			return b.date - a.date;
		} else if (sortStatus === 2) {
			return a.step - b.step;
		} else if (sortStatus === 3) {
			return b.step - a.step;
		}
	};

	const onCheckboxChange = (e, el) => {
		let checked = e.target.checked;
		if (el) {
			setOrderState(
				orderState.map((data) => {
					if (el.id === data.id) {
						data.select = checked;
					}
					return data;
				})
			);
		} else {
			setOrderState(
				orderState.map((el) => {
					el.select = checked;
					return el;
				})
			);
		}
		const checkedItems = orderState.filter((el) => el.select);
		setOrdersToDelete(checkedItems);
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

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const onHandleSearch = () => {
		if (query.length >= 3) {
			return orderState
				.filter((el) => el.orderId.includes(query))
				.sort((a, b) => filterStatus(a, b));
		} else {
			return orderState
				.sort((a, b) => filterStatus(a, b))
				.slice(indexOfFirstItem, indexOfLastItem);
		}
	};

	return (
		<>
			<DeleteModal
				input={ordersToDelete.length}
				toDelete={ordersToDelete}
				open={open}
				setOpen={setOpen}
				setShowSuccess={setShowSuccess}
				asyncFunction={deleteOrders}
				mainText="Delete these orders?"
				secondText="Orders amount"
				description="these orders"
				setToDelete={setOrdersToDelete}
			/>
			<ListContainer
				display="inline-block"
				minwidth=""
				minheight="40rem"
			>
				{showSuccess && (
					<Alert success right="1rem" top="1rem">
						Orders deleted!
					</Alert>
				)}

				<Search
					tooltip={true}
					query={query}
					setQuery={setQuery}
					width="20rem"
					placeholder="Search by ID"
				/>
				<Pagination
					top="1.3rem"
					itemsPerPage={itemsPerPage}
					totalItems={data?.length}
					paginate={paginate}
					currentPage={currentPage}
					query={query}
				/>
				<AnimatePresence>
					{ordersToDelete.length > 0 && (
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
								Orders checked:{' '}
								<strong>{ordersToDelete.length}</strong>
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
				<MobileFilter>
					<AllCheckerMobile>
						<ListCheckbox
							type="checkbox"
							onChange={(e) => onCheckboxChange(e)}
						/>
						Check all
					</AllCheckerMobile>
					<StatusMobile onClick={handleStatus}>
						{renderIcon()}
						Status
						<ArrowsFilterIcon />
					</StatusMobile>
				</MobileFilter>
				<Table display="inline-block">
					<TableHead>
						<TableRow fontW="bold">
							<TableCellHead>
								<ListCheckbox
									type="checkbox"
									onChange={(e) => onCheckboxChange(e)}
								/>
								ID
							</TableCellHead>
							<TableCellHead center>Date</TableCellHead>
							<TableCellHead center pointer onClick={handleStatus}>
								{renderIcon()}
								Status
								<ArrowsFilterIcon />
							</TableCellHead>
							<TableCellHead center>Payment</TableCellHead>
							<TableCellHead center>Quantity</TableCellHead>
							<TableCellHead center>Total</TableCellHead>
							<TableCellHead>Actions</TableCellHead>
						</TableRow>
					</TableHead>

					<TableBody>
						{orderState &&
							onHandleSearch().map((el, i) => (
								<TableRow key={el.id}>
									<TableCell data-label="ID">
										<ListCheckbox
											onChange={(e) => onCheckboxChange(e, el)}
											type="checkbox"
											checked={el.select}
										/>
										{el.orderId}
									</TableCell>
									<TableCell data-label="Date" center>
										{giveDateSpan(el.date)}
									</TableCell>
									<TableCell data-label="Status" center>
										<Status step={el.step} />
									</TableCell>
									<TableCell data-label="Payment" center>
										{el.payment === 1 ? (
											<CreditCardIcon />
										) : (
											<CashIcon />
										)}
									</TableCell>
									<TableCell data-label="Quantity" center>
										{' '}
										{el.orderInfo.reduce((a, b) => {
											return a + b.quantity;
										}, 0)}
									</TableCell>

									<TableCell data-label="Total" center>
										${el.totalPrice}
									</TableCell>
									<TableCell data-label="Actions" center>
										<SettingsIcon
											onClick={() => linkToOrder(el.orderId)}
										/>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				{loading && <Loader primary veryhigh margincenter />}
			</ListContainer>
		</>
	);
};

export default List;
