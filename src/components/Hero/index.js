import React from 'react';

import {
	HeroH1,
	HeroContainer,
	HeroP,
	HeroContent,
	HeroWrapper,
} from './HeroElements';
import ButtonLink from '../ButtonLink';

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
					<ButtonLink to="/">Order now!</ButtonLink>
				</HeroContent>
			</HeroWrapper>
		</HeroContainer>
	);
};

export default Hero;
