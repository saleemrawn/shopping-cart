import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body, ul, li, img, h1, h2, h3, h4, h5 {
        padding: 0;
        margin: 0;
    }

    body {
        font-size: 16px;
        font-family: "Inter", sans-serif;
        color: #212121;
    }

    a {
        color: inherit
    }

    ul {

        list-style-type: none;
    }

    input {
        width: 100%;
    }

    a:hover, button:hover {
        cursor: pointer;
    }

`;

export default GlobalStyle;
