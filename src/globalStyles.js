import { createGlobalStyle } from 'styled-components';

import './index.css';

export const GlobalStyle = createGlobalStyle`
:root {
    --color-white: #fff;
    --color-grey-light:  rgb(232, 230, 227);
    --color-grey-dark: #252525;
    --color-secondary: #E7272D;
    --color-tertiary: #FFCC00;
    --color-green: #11c454;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}

html {
    font-size: 62.5%;
    @media only screen and (max-width: 840px) {
		font-size: 50%;
	}
}

h1, h2, h3 {
    font-family: 'Arvo', sans-serif;
    font-weight: 700;
}

body {
    font-family: 'Rubik', sans-serif;
    background-color: ${(props) => props.backgroundColor}
}

a {
    text-decoration: none;
}

ul {
    list-style: none;
}


`;
