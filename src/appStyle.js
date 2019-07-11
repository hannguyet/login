import styled from 'styled-components';

const AppWrapper = styled.div`
  .anticon:before {
    display: block;
    font-family: 'anticon' !important;
  }
  .anticon:after {
    display: block;
    font-family: 'anticon' !important;
  }
  .gradientBackground {
    background-image: ${({ theme }) =>
      `linear-gradient(90deg, '#4cb1e8', '#4c53ae')`};
  }
  .uppercase {
    text-transform: uppercase;
  }

  .align-center {
    display: flex;
    align-items: center;
  }

  .text-center {
    text-align: center;
  }

  .fieldItem {
    margin-bottom: 10px;
  }
`;

export default AppWrapper;
