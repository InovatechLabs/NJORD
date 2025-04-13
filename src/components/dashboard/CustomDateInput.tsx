import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: rgba(57, 63, 84, 0.8);
  color: #bfd2ff;
  font-size: 1.3rem;
  line-height: 1.7rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  flex-grow: 1;
  width: 100%;

  &::placeholder {
    color: #7881A1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(191, 210, 255, 0.3);
  }
`;

interface Props {
  value?: string;
  onClick?: () => void;
}

export const CustomDateInput = React.forwardRef<HTMLInputElement, Props>(
  ({ value, onClick }, ref) => (
    <StyledInput
      onClick={onClick}
      value={value}
      readOnly
      placeholder="Selecione a data"
      ref={ref}
    />
  )
);