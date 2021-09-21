import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableButton,
} from 'components/Table/TableElements';

import { MainContainer } from 'components/AdminPanel/Containers';

import Search from 'components/FilterGroup/Search';

import {
	TickIcon,
	SaleIcon,
	CrossIcon,
} from 'components/AdminPanel/Icons';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAdminAllProducts } from 'utils/firebaseGetters';

const List = () => {
	const { data } = useFirestoreQuery(getAdminAllProducts());
	const [query, setQuery] = useState('');
	return (
		<MainContainer>
			<Search setQuery={setQuery} width="20rem" />
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
											style={{ height: '6rem' }}
											src={el.img}
											alt={el.alt}
										/>
									</TableCell>
									<TableCell>{el.name}</TableCell>
									<TableCell center>
										{el.sale ? <SaleIcon /> : 'No'}
									</TableCell>
									<TableCell center>
										{el.availability ? <TickIcon /> : <CrossIcon />}
									</TableCell>
									<TableCell>{el.category}</TableCell>
									<TableCell width="8rem">${el.price}</TableCell>
									<TableCell>
										<Link to={`/admin/products/${el.id}`}>
											<TableButton>Edit</TableButton>
										</Link>
									</TableCell>
								</TableRow>
							))}
				</TableBody>
			</Table>
		</MainContainer>
	);
};

export default List;
