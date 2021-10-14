import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Pagination } from 'components';

jest.mock('firebase', () => ({
	auth: jest.fn().mockReturnThis(),
	initializeApp: jest.fn(),
}));

const props = {
	itemsPerPage: 10,
	currentPage: 1,
	top: '1rem',
	query: '',
	paginate: jest.fn(),
};

describe('<Pagination />', () => {
	test('show 2 pages when 20 items', () => {
		const { getByText } = render(
			<Router>
				<Pagination {...props} totalItems={20} />
			</Router>
		);

		expect(getByText('1')).toBeInTheDocument();
		expect(getByText('2')).toBeInTheDocument();
	});

	test('show 4 pages when 41 items', () => {
		const { getByText } = render(
			<Router>
				<Pagination {...props} totalItems={41} />
			</Router>
		);

		expect(getByText('1')).toBeInTheDocument();
		expect(getByText('2')).toBeInTheDocument();
		expect(getByText('3')).toBeInTheDocument();
		expect(getByText('4')).toBeInTheDocument();
	});
});
