import React from 'react';

import {
	StoryContainer,
	StoryP,
	StoryDesc,
	StoryImage,
	StoryContent,
	StoryImageWrapper,
	StoryContact,
	StoryContactWrapper,
} from './StoryElements';
import { MainPageHeading } from 'components';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';

import Image from 'assets/images/story_image.webp';

import 'react-lazy-load-image-component/src/effects/blur.css';

export const Story = () => {
	return (
		<StoryContainer>
			<StoryContent>
				<MainPageHeading upper="Meet us">Our story</MainPageHeading>
				<StoryP></StoryP>
				<StoryDesc>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Voluptatibus, sed? Fuga quam, iusto nam aliquid dignissimos
					sunt est obcaecati totam unde quod! Molestiae omnis, nulla
					laudantium ea quaerat aut? Natus. <br />
					<br />
					Nobis sint amet voluptatem harum enim nisi similique, ipsum
					unde corporis temporibus eaque sapiente? Amet ullam quasi
					alias laudantium officiis voluptatibus exercitationem
					similique pariatur in aspernatur, mollitia minus vitae. Nam.
					Magni doloremque, id fugit impedit quam quasi optio quis
					tenetur illum? Eum eos quidem aspernatur numquam? Excepturi,
					labore corrupti? Totam hic error repudiandae eos! Sed illo
					fugiat magnam est aspernatur.
				</StoryDesc>
				<StoryContactWrapper>
					<StoryContact>
						<IoMdMail />
						contact@example.com
					</StoryContact>
					<StoryContact>
						<FaPhoneAlt />
						123 123 123
					</StoryContact>
				</StoryContactWrapper>
			</StoryContent>
			<StoryImageWrapper>
				<StoryImage effect="blur" src={Image} alt="Story image" />
			</StoryImageWrapper>
		</StoryContainer>
	);
};
