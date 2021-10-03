const size = {
	mobileXS: '319px',
	mobileS: '320px',
	mobileM: '460px',
	mobileL: '640px',
	tablet: '768px',
	laptopS: '1024px',
	laptopM: '1280px',
	laptopL: '1600px',
};

export const device = {
	mobileXS: `(min-width: ${size.mobileXS})`,
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptopS: `(max-width: ${size.laptopS})`,
	laptopM: `(max-width: ${size.laptopM})`,
	laptopL: `(max-width: ${size.laptopL})`,
};
