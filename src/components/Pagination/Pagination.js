import React from 'react';

import {
	PaginationNav,
	PaginationList,
	PaginationLink,
	PaginationItem,
	PaginationContainer,
	PaginationP,
} from './PaginationElements';

export const Pagination = ({
	itemsPerPage,
	totalItems,
	paginate,
	currentPage,
	top,
	query,
	left,
	right,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<>
			{query.length < 3 && (
				<PaginationContainer top={top} left={left} right={right}>
					<PaginationP>Pages</PaginationP>
					<PaginationNav>
						<PaginationList>
							{pageNumbers.map((number) => (
								<PaginationItem key={number}>
									<PaginationLink
										data-testid="paginate-number-test"
										currentpage={currentPage}
										number={number}
										onClick={(e) => {
											e.preventDefault();
											paginate(number);
										}}
										to="!#"
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
