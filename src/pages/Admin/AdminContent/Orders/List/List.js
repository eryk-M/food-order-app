import React, { useState, useEffect } from 'react';

import {
	useFirestoreQuery,
	useWindowSize,
	usePagination,
} from 'hooks';
import { getAdminAllOrders } from 'utils/firebaseGetters';
import { useApi } from 'contexts';

import {
	DeleteModal,
	Search,
	Loader,
	Pagination,
	Status,
	Info,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	TableCellHead,
	SettingsIcon,
	ArrowsFilterIcon,
	ArrowDownFilterIcon,
	ArrowUpFilterIcon,
	CashIcon,
	CreditCardIcon,
	Button,
	AlertAdmin,
} from 'components';

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

import { AnimatePresence } from 'framer-motion';

const renderIcon = (sort) => {
	if (sort === 1) {
		return null;
	} else if (sort === 2) {
		return React.createElement(ArrowUpFilterIcon);
	} else if (sort === 3) {
		return React.createElement(ArrowDownFilterIcon);
	}
};

const Sort = ({ children, setSort, sort }) => {
	return (
		<TableCellHead
			center
			pointer
			onClick={setSort}
			className={sort > 1 ? 'sort-active' : ''}
		>
			{renderIcon(sort)}
			{children}
			<ArrowsFilterIcon />
		</TableCellHead>
	);
};

const List = () => {
	const { data, loading } = useFirestoreQuery(getAdminAllOrders());
	const { deleteOrders } = useApi();
	const { width } = useWindowSize();
	const {
		itemsPerPage,
		paginate,
		currentPage,
		indexOfFirstItem,
		indexOfLastItem,
		setCurrentPage,
	} = usePagination(10);
	const history = useHistory();

	const [query, setQuery] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [sortStatus, setSortStatus] = useState(1);
	const [sortPrice, setSortPrice] = useState(1);
	const [sortDate, setSortDate] = useState(1);
	const [open, setOpen] = useState(false);
	const [ordersToDelete, setOrdersToDelete] = useState([]);
	const [orderState, setOrderState] = useState([]);

	useEffect(() => {
		if (data?.length <= 10) {
			setCurrentPage(1);
		}
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
	}, [data, setCurrentPage]);

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

	const handleSortNumber = (sort, setSort) => {
		if (sort === 3) {
			setSort(1);
		} else {
			setSort((prevSort) => prevSort + 1);
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

	const filterPrice = (a, b) => {
		if (sortPrice === 1) {
			return true;
		} else if (sortPrice === 2) {
			return a.totalPrice - b.totalPrice;
		} else if (sortPrice === 3) {
			return b.totalPrice - a.totalPrice;
		}
	};

	const filterDate = (a, b) => {
		if (sortDate === 1) {
			return true;
		} else if (sortDate === 2) {
			return a.date - b.date;
		} else if (sortDate === 3) {
			return b.date - a.date;
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

	const onHandleSearch = () => {
		if (query.length >= 3) {
			return orderState
				.filter((el) => el.orderId.includes(query))
				.sort((a, b) => filterStatus(a, b))
				.sort((a, b) => filterPrice(a, b))
				.sort((a, b) => filterDate(a, b));
		} else {
			return orderState
				.sort((a, b) => filterStatus(a, b))
				.sort((a, b) => filterPrice(a, b))
				.sort((a, b) => filterDate(a, b))
				.slice(indexOfFirstItem, indexOfLastItem);
		}
	};

	return (
		<>
			<Info>
				- Data in Orders Panel are coming from main page. You can
				delete orders and test food tracker.
			</Info>
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
				<AlertAdmin right="2rem" showSuccess={showSuccess}>
					Orders deleted
				</AlertAdmin>

				<Search
					tooltip={true}
					query={query}
					setQuery={setQuery}
					width="20rem"
					placeholder="Search by ID"
				/>
				{data?.length > 10 && (
					<Pagination
						top="1.3rem"
						itemsPerPage={itemsPerPage}
						totalItems={data?.length}
						paginate={paginate}
						currentPage={currentPage}
						query={query}
					/>
				)}
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
					<StatusMobile
						onClick={() => {
							handleSortNumber(sortStatus, setSortStatus);
							setSortPrice(1);
							setSortDate(1);
						}}
					>
						{renderIcon(sortStatus)}
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
							<Sort
								setSort={() => {
									handleSortNumber(sortDate, setSortDate);
									setSortStatus(1);
									setSortPrice(1);
								}}
								sort={sortDate}
							>
								Date{' '}
							</Sort>

							<Sort
								setSort={() => {
									handleSortNumber(sortStatus, setSortStatus);
									setSortDate(1);
									setSortPrice(1);
								}}
								sort={sortStatus}
							>
								Status
							</Sort>
							<TableCellHead center>Payment</TableCellHead>
							{width >= 1280 && (
								<TableCellHead center>Quantity</TableCellHead>
							)}
							<Sort
								setSort={() => {
									handleSortNumber(sortPrice, setSortPrice);
									setSortDate(1);
									setSortStatus(1);
								}}
								sort={sortPrice}
							>
								Total
							</Sort>
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
									{width >= 1280 && (
										<TableCell data-label="Quantity" center>
											{' '}
											{el.orderInfo.reduce((a, b) => {
												return a + b.quantity;
											}, 0)}
										</TableCell>
									)}
									{width <= 460 && (
										<TableCell data-label="Quantity" center>
											{' '}
											{el.orderInfo.reduce((a, b) => {
												return a + b.quantity;
											}, 0)}
										</TableCell>
									)}

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
