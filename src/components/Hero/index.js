import React from 'react';

import {
	HeroH1,
	HeroContainer,
	HeroP,
	HeroContent,
	HeroWrapper,
} from './HeroElements';
import Button from '../Button';

const Hero = () => {
	return (
		<HeroContainer>
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
					<Button>Order now!</Button>
				</HeroContent>
			</HeroWrapper>
		</HeroContainer>
	);
};

export default Hero;
