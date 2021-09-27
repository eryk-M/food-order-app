import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableButton,
} from 'components/Table/TableElements';

import {
	MainContainer,
	LoaderContainer,
} from 'components/Admin/Containers';
import Loader from 'components/Loader';
import Search from 'components/FilterGroup/Search';
import DeleteModal from 'components/DeleteModal';
import {
	TickIcon,
	SaleIcon,
	CrossIcon,
} from 'components/Admin/Icons';

import { Alert } from 'components/Alert';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAdminAllProducts } from 'utils/firebaseGetters';
import { useAdminApi } from 'contexts/AdminAPIContext';
const List = () => {
	const { data, loading } = useFirestoreQuery(getAdminAllProducts());
	const { deleteAdminProduct } = useAdminApi();
	const [query, setQuery] = useState('');
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);

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
			<MainContainer>
				{showSuccess && (
					<Alert success right="1rem" top="1rem">
						Product ID: {id} deleted!
					</Alert>
				)}
				<Search
					setQuery={setQuery}
					width="20rem"
					placeholder="Search by name"
				/>
				<Table>
					<TableBody>
						<TableRow backgroundColor="#93949417" fontW="bold">
							<TableCell width="8rem">ID</TableCell>
							<TableCell width="12rem">Image</TableCell>
							<TableCell>Name</TableCell>
							<TableCell width="8rem">Sale</TableCell>
							<TableCell width="13rem">Availability</TableCell>
							<TableCell>Category</TableCell>
							<TableCell width="10rem">Price</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
						{data &&
							data
								.filter((el) =>
									el.name.toLowerCase().includes(query.toLowerCase())
								)
								.map((el, i) => (
									<TableRow key={i}>
										<TableCell>{el.id}</TableCell>
										<TableCell>
											<img
												style={{
													height: '6rem',
													width: '6rem',
													objectFit: 'cover',
												}}
												src={el.img}
												alt={el.alt}
											/>
										</TableCell>
										<TableCell>{el.name}</TableCell>
										<TableCell center>
											{el.discountPrice !== 0 ? <SaleIcon /> : 'No'}
										</TableCell>
										<TableCell center>
											{el.availability ? <TickIcon /> : <CrossIcon />}
										</TableCell>
										<TableCell>{el.category}</TableCell>
										<TableCell width="8rem">${el.price}</TableCell>
										<TableCell>
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
			</MainContainer>
		</>
	);
};

export default List;
