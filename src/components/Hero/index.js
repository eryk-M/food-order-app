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
} from './HeroElements';
import ButtonLink from '../ButtonLink';
import Shape from 'images/shape.png';
import ImgBg from '../../images/header-burger-2.jpg';
const Hero = () => {
	const height = window.outerHeight;
	return (
		<HeroContainer height={height}>
			<HeroImageWrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 0.5 } }}
			>
				<HeroIMG src={ImgBg} />
			</HeroImageWrapper>
			<HeroWrapper>
				<HeroContent>
					<HeroP
						fontFamily="Shadows Into Light Two, handwriting"
						color="white"
					>
						Express food to raise your mood!
					</HeroP>
					<HeroH1>The best burgers in town</HeroH1>
					<HeroP fontFamily="Arvo, serif">From $10.99</HeroP>
					<ButtonLink to="/products">Order now!</ButtonLink>
				</HeroContent>
			</HeroWrapper>
			<HeroShape src={Shape} alt="Shape" />
		</HeroContainer>
	);
};

export default Hero;
