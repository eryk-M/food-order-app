import React, { useState, useRef, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
	DeleteModal,
	Search,
	Loader,
	Pagination,
	LoaderContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableButton,
	TableHead,
	TableCellHead,
	TickIcon,
	SaleIcon,
	CrossIcon,
	Alert,
} from 'components';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAdminAllProducts } from 'utils/firebaseGetters';
import { useApi, useAdminApi } from 'contexts';
import {
	ListImage,
	ProductsListContainer,
	ProductsReset,
} from './ListElements';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { dummyData } from 'utils/dummyData';

const List = () => {
	const { data, loading } = useFirestoreQuery(getAdminAllProducts());
	const { deleteAdminProduct } = useAdminApi();
	const { setAdminItems, setItems } = useApi();

	const [query, setQuery] = useState('');
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const [resetSuccess, setResetSuccess] = useState(false);

	const timeoutRef = useRef();

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	//PAGINATE
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	useEffect(() => {
		if (data?.length <= 10) {
			setCurrentPage(1);
		}
		return () => {
			clearTimeout(timeoutRef.current);
			setIsLoading(false);
		};
	}, [data]);

	const onHandleSearch = () => {
		if (query.length >= 3) {
			return data.filter((el) =>
				el.name.toLowerCase().includes(query.toLowerCase())
			);
		} else {
			return data.slice(indexOfFirstItem, indexOfLastItem);
		}
	};

	//RESET ADMIN
	const onSetItems = async () => {
		setIsLoading(true);
		try {
			await setAdminItems(dummyData);
			setIsLoading(false);
			setResetSuccess(true);

			const timeout = setTimeout(() => {
				setResetSuccess(false);
			}, 3000);
			timeoutRef.current = timeout;
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	//RESET ZWYKLE
	// const onSetMainItems = () => {
	// 	try {
	// 		console.log('Wrzucam...');
	// 		setItems(dummyData);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<>
			<DeleteModal
				input={id}
				toDelete={id}
				open={open}
				setOpen={setOpen}
				setShowSuccess={setShowSuccess}
				asyncFunction={deleteAdminProduct}
				mainText="Delete this product?"
				secondText="PRODUCT ID"
				description="this product"
			/>
			<ProductsListContainer>
				{showSuccess && (
					<Alert success right="1rem" top="1rem">
						Product ID: {id} deleted!
					</Alert>
				)}
				<Search
					tooltip={true}
					query={query}
					setQuery={setQuery}
					width="20rem"
					placeholder="Search by name"
				/>

				<ProductsReset
					loading={isLoading}
					onSetItems={onSetItems}
					resetSuccess={resetSuccess}
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
				<Table>
					<TableHead>
						<TableRow fontW="bold">
							<TableCellHead width="4rem">ID</TableCellHead>
							<TableCellHead width="12rem">Image</TableCellHead>
							<TableCellHead width="20%">Name</TableCellHead>
							<TableCellHead width="10rem">Sale</TableCellHead>
							<TableCellHead width="20%">Availability</TableCellHead>
							<TableCellHead width="20%">Category</TableCellHead>
							<TableCellHead width="20%">Price</TableCellHead>
							<TableCellHead width="15rem" textalign="center">
								Actions
							</TableCellHead>
						</TableRow>
					</TableHead>

					<TableBody>
						{data &&
							onHandleSearch().map((el) => (
								<TableRow key={el.id}>
									<TableCell data-label="ID" width="4rem">
										{el.id}
									</TableCell>
									<TableCell data-label="Image">
										<ListImage
											src={el.img}
											alt={el.alt}
											effect="opacity"
										/>
									</TableCell>
									<TableCell data-label="Name">{el.name}</TableCell>
									<TableCell center data-label="Sale">
										{el.discountPrice !== 0 ? <SaleIcon /> : 'No'}
									</TableCell>
									<TableCell center data-label="Availability">
										{el.availability ? <TickIcon /> : <CrossIcon />}
									</TableCell>
									<TableCell data-label="Category">
										{el.category}
									</TableCell>
									<TableCell data-label="Price">
										$
										{el.discountPrice === 0
											? el.price
											: el.discountPrice}
									</TableCell>
									<TableCell data-label="Actions" center>
										<Link to={`/admin/products/${el.id}`}>
											<TableButton secondary>Edit</TableButton>
										</Link>
										<TableButton
											primary
											marginleft="1rem"
											onClick={() => {
												setOpen((currOpen) => !currOpen);
												setId(el.id);
											}}
										>
											Delete
										</TableButton>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				{loading && (
					<LoaderContainer height="30rem">
						<Loader primary />
					</LoaderContainer>
				)}
			</ProductsListContainer>
		</>
	);
};

export default List;
