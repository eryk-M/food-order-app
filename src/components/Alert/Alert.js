import { AlertContainer, AlertSuccessIcon } from './AlertElements';

export const Alert = ({ right, top, children, success, ...rest }) => {
	return (
		<AlertContainer
			right={right}
			top={top}
			success={success}
			{...rest}
		>
			{success && <AlertSuccessIcon />} {children}
		</AlertContainer>
	);
};
