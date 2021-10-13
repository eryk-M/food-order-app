import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminTopBar } from 'pages';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('firebase', () => ({
	auth: jest.fn().mockReturnThis(),
	initializeApp: jest.fn(),
}));

describe('<AdminTopBar />', () => {
	test('Changing class when sidebar is hidden', () => {
		const hidden = jest.fn();
		const setHidden = jest.spyOn(React, 'useState');
		setHidden.mockImplementation((hidden) => [hidden, setHidden]);
		const { queryByTestId } = render(
			<Router>
				<AdminTopBar
					setHidden={setHidden}
					width={1025}
					hidden={hidden}
				/>
			</Router>
		);

		fireEvent.click(queryByTestId('topbar-test'));
		expect(setHidden).toBeCalled();
		expect(hidden).toBeTruthy();
	});
});
