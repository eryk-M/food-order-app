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
	query,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<>
			{query.length < 3 && (
				<PaginationContainer top={top}>
					<PaginationP>Pages</PaginationP>
					<PaginationNav>
						<PaginationList>
							{pageNumbers.map((number) => (
								<PaginationItem key={number}>
									<PaginationLink
										currentPage={currentPage}
										number={number}
										onClick={(e) => {
											e.preventDefault();
											paginate(number);
										}}
										href="!#"
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
