import React from 'react';

import {
	FooterContainer,
	FooterMedia,
	FooterMediaIcon,
	FooterLogo,
	FooterAddress,
	FooterDetail,
	FooterCopy,
} from './FooterElements';

import {
	FaFacebookF,
	FaInstagram,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa';

import Logo from 'assets/images/logo.png';

import { withRouter } from 'react-router';

const Footer = (props) => {
	const { location } = props;
	if (location.pathname.match(/admin/)) {
		return null;
	}
	return (
		<FooterContainer>
			<FooterMedia>
				<FooterMediaIcon facebook>
					<FaFacebookF />
				</FooterMediaIcon>
				<FooterMediaIcon instagram>
					<FaInstagram />
				</FooterMediaIcon>
				<FooterMediaIcon twitter>
					<FaTwitter />
				</FooterMediaIcon>
				<FooterMediaIcon youtube>
					<FaYoutube />
				</FooterMediaIcon>
			</FooterMedia>
			<FooterLogo src={Logo} alt="Logo" />
			<FooterAddress>
				<FooterDetail>Burger House</FooterDetail>
				<FooterDetail>
					13-370 Sri Dźajawardanapura Kotte, Ricky & Morty 1/2, Sri
					Lanka
				</FooterDetail>
				<FooterDetail>Phone: 123 123 123</FooterDetail>
			</FooterAddress>
			<FooterCopy>Copyright &copy; 2021 by eryk-M</FooterCopy>
		</FooterContainer>
	);
};

export default withRouter(Footer);
