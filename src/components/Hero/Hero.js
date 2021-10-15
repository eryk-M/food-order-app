import React from 'react';

import {
	HeroH1,
	HeroContainer,
	HeroP,
	HeroContent,
	HeroWrapper,
	HeroShape,
	HeroImageWrapper,
	HeroIMG,
	HeroSpan,
} from './HeroElements';

import { ButtonLink } from 'components';
import Shape from 'assets/images/shape.png';
import ImgBg from 'assets/images/header-burger-2.jpg';

export const Hero = () => {
	return (
		<HeroContainer>
			<HeroImageWrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 0.5 } }}
			>
				<HeroIMG src={ImgBg} />
			</HeroImageWrapper>
			<HeroWrapper>
				<HeroContent>
					<HeroSpan>Express food to raise your mood!</HeroSpan>
					<HeroH1>The best burgers in town</HeroH1>
					<HeroP>From $10.99</HeroP>
					<ButtonLink to="/products">Order now!</ButtonLink>
				</HeroContent>
			</HeroWrapper>
			<HeroShape src={Shape} alt="Shape" />
		</HeroContainer>
	);
};
