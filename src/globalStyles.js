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
      font-size: 37.5%;
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
    color: unset
}

ul {
    list-style: none;
}

input, textarea {
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-weight: 400;
    outline: 0;
	font-family: inherit;
}

/* input[type=file]{
    display: none;
} */
.stars-error {
    border: 1px solid var(--color-red);
}

.active-user-nav {
    font-weight: 700;
    background-color: var(--color-secondary)
}

::-webkit-file-upload-button {
    display: inline-block;
		background-color: var(--color-secondary);
		padding: 1rem 1.5rem;
		border-radius: 5px;
		cursor: pointer;
		box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.2);
	}

.is-hidden-menu {
    width: 5rem !important;
    & a {
        width: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        & .icon-arrow {
            display: none !important
        }
        & .icon-left {
            margin-right: 0;
        }
        & p {
            display: none;
        width: 5rem;
        }
    }
    & li {
        /* width: 5rem; */
        /* display: none; */
        & li {
            
            /* width: 5rem; */
        }
    }
    
    
    & img {
        height: 4rem;
    }
    
    & ul {
        padding: 0;
    }
}
.is-hidden-content{
    margin-left: 5rem !important;
    padding-left: 1rem;
   
}
`;
