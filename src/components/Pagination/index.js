import React, { useState, useEffect, useMemo } from 'react';

import {
	PaginationNav,
	PaginationList,
	PaginationLink,
	PaginationItem,
	PaginationContainer,
	PaginationP,
} from './PaginationElements';

const Pagination = ({
	itemsPerPage,
	totalItems,
	paginate,
	currentPage,
	top,
}) => {
	const [show, setShow] = useState(true);

	const pageNumbers = useMemo(() => [], []);

	//TODO: PAGINATION
	// JAK WKLEPIE 3 LITERY MUSI ZNIKNAC PAGINACJA I ZACZAC FILTROWAC, AKTUALNIE WYPIERDALA BLAD PRZY 3 LITERACH
	useEffect(() => {
		if (pageNumbers < 100) {
			setShow(true);
			for (
				let i = 1;
				i <= Math.ceil(totalItems / itemsPerPage);
				i++
			) {
				pageNumbers.push(i);
			}
		} else {
			setShow(false);
		}
	}, [itemsPerPage, pageNumbers, totalItems, show]);

	return (
		<>
			{show && (
				<PaginationContainer top={top}>
					<PaginationP>Pages</PaginationP>
					<PaginationNav>
						<PaginationList className="pagination">
							{pageNumbers.map((number) => (
								<PaginationItem key={number} className="page-item">
									<PaginationLink
										currentPage={currentPage}
										number={number}
										onClick={(e) => {
											e.preventDefault();
											paginate(number);
										}}
										href="!#"
										className="page-link"
									>
										{number}
									</PaginationLink>
								</PaginationItem>
							))}
						</PaginationList>
					</PaginationNav>
				</PaginationContainer>
			)}
		</>
	);
};

export default Pagination;
