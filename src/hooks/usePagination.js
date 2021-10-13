import { useState } from 'react';

export const usePagination = (items) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(items);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return {
		itemsPerPage,
		paginate,
		currentPage,
		indexOfFirstItem,
		indexOfLastItem,
		setCurrentPage,
	};
};
