import { createGlobalStyle } from 'styled-components';

import { NavLogoImage } from 'components/NavBar/NavBarElements';

export const GlobalStyle = createGlobalStyle`
:root {
    --color-white: #fff;
    --color-grey-light:  rgb(232, 230, 227);
    --color-grey-dark: #252525;
    --color-grey-dark-2: #303030;
    --color-primary: #E7272D;
    --color-secondary: #FFCC00;
    --color-green: #11c454;
    --color-red: #f81212;
    --color-blue: #52b7ff;
    --color-grey-light-2: rgb(189, 189, 188);
    --color-footer: #1a1a1a;
    --color-purple-light: #b374ec;
    --color-background-grey-light: #93949417
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}

html, body {
    overflow-x: hidden;
}
html {
    font-size: 62.5%;
    @media only screen and (max-width: 840px) {
		font-size: 50%;
	}
    @media only screen and (min-width: 1921px){
        font-size: 75%;
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
    transition: border .2s ease;

}

input[type=file]{
    border: none;
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
        border: none;
        margin-right: 1rem;
	}

.is-hidden-menu-desktop {
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

    
    & img {
        height: 4rem;
    }
    
    & ul {
        padding: 0;
    }
    & div {
        & ul {
            width: 5rem;
        }
    }
}
.is-hidden-content-desktop{
    margin-left: 5rem !important;
    padding-left: 1rem;
   
    
}


.is-hidden-menu-mobile {
    transform: translateX(0) !important
}

.fixed-menu {
    position: fixed;
    height: auto;
    background-color: var(--color-grey-dark);
    padding: 1rem 4rem;
    ${NavLogoImage}{
        height: 8rem;
    }
}

`;
