import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableButton,
	TableHead,
	TableCellHead,
} from 'components/Table/TableElements';

import { LoaderContainer } from 'components/Admin/Containers';
import Loader from 'components/Loader';
import Search from 'components/FilterGroup/Search';
import DeleteModal from 'components/DeleteModal';
import {
	TickIcon,
	SaleIcon,
	CrossIcon,
} from 'components/Admin/Icons';
import Pagination from 'components/Pagination';
import { Alert } from 'components/Alert';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAdminAllProducts } from 'utils/firebaseGetters';
import { useAdminApi } from 'contexts/AdminAPIContext';
import { ListImage, ProductsListContainer } from './ListElements';
import 'react-lazy-load-image-component/src/effects/opacity.css';
const List = () => {
	const { data, loading } = useFirestoreQuery(getAdminAllProducts());
	const { deleteAdminProduct } = useAdminApi();

	const [query, setQuery] = useState('');
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	//PAGINATE
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const onHandleSearch = () => {
		if (query.length >= 3) {
			return data.filter((el) =>
				el.name.toLowerCase().includes(query.toLowerCase())
			);
		} else {
			return data.slice(indexOfFirstItem, indexOfLastItem);
		}
	};

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
				{data?.length > 0 && (
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
										${el.price}
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
