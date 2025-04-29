import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, 
      #1c1c30, 
      #1c1c30);
    background-size: cover; 
    background-position: center 0px; 
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
  }
`;

export default GlobalStyles;