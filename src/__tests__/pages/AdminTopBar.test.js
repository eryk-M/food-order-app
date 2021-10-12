import { render, fireEvent } from '@testing-library/react';
import { AdminTopBar } from 'pages';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('firebase', () => ({
	auth: jest.fn().mockReturnThis(),
	initializeApp: jest.fn(),
}));

describe('<TopBar/>', () => {
	it('renders', () => {
		const wrapper = mount();
	});
});
