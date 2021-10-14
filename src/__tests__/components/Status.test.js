import { render } from '@testing-library/react';
import { Status } from 'components';

jest.mock('firebase', () => ({
	auth: jest.fn().mockReturnThis(),
	initializeApp: jest.fn(),
}));

describe('<Status />', () => {
	test('renders "New" when step is 0', () => {
		const { queryByTestId } = render(<Status step={0} />);
		expect(queryByTestId('status-step').textContent).toEqual('New');
	});

	test('renders "Cancelled" when step is 5', () => {
		const { queryByTestId } = render(<Status step={5} />);
		expect(queryByTestId('status-step').textContent).toEqual(
			'Cancelled'
		);
	});
});
