import { render } from '@testing-library/react';
import { ProductsContent } from 'pages';
import '@testing-library/jest-dom';
import { dummyData } from 'utils/dummyData';
import { CartProvider } from 'contexts';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('firebase', () => ({
	auth: jest.fn().mockReturnThis(),
	initializeApp: jest.fn(),
}));
const searchQuery = {
	sort: 'default',
	query: '',
	category: 'All',
	minPrice: 0,
	maxPrice: 40,
};
describe('<ProductsContent />', () => {
	test('renders with products data', () => {
		const { getByText } = render(
			<CartProvider>
				<Router>
					<ProductsContent
						data={dummyData}
						searchQuery={searchQuery}
					/>
				</Router>
			</CartProvider>
		);
		expect(getByText('Classic Burger')).toBeInTheDocument();
		expect(getByText('Fries')).toBeInTheDocument();
		expect(getByText('Belgian Fries')).toBeInTheDocument();
	});
});
