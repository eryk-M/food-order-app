import { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

function _ScrollToTop(props) {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return props.children;
}
export const ScrollToTop = withRouter(_ScrollToTop);
