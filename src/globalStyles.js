import { createGlobalStyle } from 'styled-components';

import './index.css';

export const GlobalStyle = createGlobalStyle`
:root {
    --color-white: #fff;
    --color-grey-light:  rgb(232, 230, 227);
    --color-grey-dark: #252525;
    --color-secondary: rgb(233, 58, 63);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}

html {
    font-size: 62.5%;
}

h1, h2, h3 {
    font-family: 'Arvo', sans-serif;
    font-weight: 700;
}

a {
    text-decoration: none;
}

ul {
    list-style: none;
}


`;
