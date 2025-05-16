import styled from 'styled-components';

interface AsideProps {
  isCollapsed: boolean;
}

export const StyledAside = styled.aside<AsideProps>`
  background-color: #1A2C3F;
  padding: ${(props) => (props.isCollapsed ? '0' : '1rem')};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 0;
  align-self: start;
  overflow: hidden;
  overflow-y: auto;
  height: 100vh;

  width: ${(props) => (props.isCollapsed ? '0' : '16rem')};
  transition: width 0.4s ease, padding 0.3s ease;
  opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
  transition: width 0.4s ease, padding 0.3s ease, opacity 0.3s ease;

  h1,
  .summary-item {
    opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
    transition: opacity 0.3s ease;
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: white;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
      background-color: #3b82f6;
    }

    img {
      width: 2.5rem;
      height: 2.5rem;
    }

    .text {
      display: flex;
      flex-direction: column;
    }
  }
`;
