import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminTopBar } from 'pages';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('firebase', () => ({
	auth: jest.fn().mockReturnThis(),
	initializeApp: jest.fn(),
}));

describe('<AdminTopBar />', () => {
	test('render', () => {
		const { queryByTestId } = render(
			<Router>
				<AdminTopBar />
			</Router>
		);

		fireEvent.click(queryByTestId('topbar-test'));

		expect(queryByTestId('topbar-nav-test')).toHaveClass(
			'is-hidden-content-desktop'
		);
	});
});
