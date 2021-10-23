import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Detector } from 'react-detect-offline';

import {
	Connected,
	Disconnected,
	ConnectionContainer,
	Progress,
} from './ConnectionStatusElements';

export const ConnectionStatus = () => {
	const [isOffline, setIsOffline] = useState(false);
	const [flag, setFlag] = useState(false);
	const timeoutRef = useRef();

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<>
			<AnimatePresence>
				{(isOffline || flag) && (
					<ConnectionContainer
						initial={{
							opacity: 0,
							y: -100,
							x: '-50%',
						}}
						animate={{
							opacity: 1,
							y: 0,
							x: '-50%',
						}}
						exit={{
							opacity: 0,
							y: -100,
							x: '-50%',
						}}
						transition={{ duration: 0.5 }}
						isOffline={isOffline}
						flag={flag}
					>
						<Detector
							render={({ online }) => (
								<>
									{online ? (
										<>
											{' '}
											<Connected /> Connected{' '}
										</>
									) : (
										<>
											{' '}
											<Disconnected /> You are currently offline{' '}
										</>
									)}
								</>
							)}
						/>
						<Progress
							className={flag ? 'animate-progress' : ''}
							flag={flag}
						/>
					</ConnectionContainer>
				)}
			</AnimatePresence>
			<Detector
				render={({ online }) => {
					return true;
				}}
				onChange={() => {
					if (isOffline) {
						setFlag(true);
						setIsOffline(false);
						const timeout = setTimeout(() => {
							setFlag(false);
						}, 3000);
						timeoutRef.current = timeout;
					} else {
						clearTimeout(timeoutRef.current);
						setFlag(false);
						setIsOffline(true);
					}
				}}
			/>
		</>
	);
};
