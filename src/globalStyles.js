import { createGlobalStyle } from 'styled-components';

import './index.css';

export const GlobalStyle = createGlobalStyle`
:root {
    --color-white: #fff;
    --color-grey-light:  rgb(232, 230, 227);
    --color-grey-dark: #252525;
    --color-primary: #E7272D;
    --color-secondary: #FFCC00;
    --color-green: #11c454;
    --color-red: #f81212;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}

html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    @media only screen and (max-width: 840px) {
		font-size: 50%;
	}
    @media only screen and (max-width: 600px) {
      font-size: 37.5%; // 1rem = 6px; 6px/16px = 37.5%
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

input, textarea {
    border: 1px solid #ccc !important;
    border-radius: 0.5rem;
    font-weight: 400;
    outline: 0;
	font-family: inherit;
}
.stars-error {
    border: 1px solid var(--color-red);
}

.active-user-nav {
    font-weight: 700;
    background-color: var(--color-secondary)
}
`;
