import React from 'react';
import styled from 'styled-components';
import { color } from '../../common/color';

const StyledButton = styled.button`
  height: 25px;
  width: 100%;
  border-radius: 4px;
  border: 2px solid ${color.LIGHT_GREY};
  cursor: pointer;
  margin: 2px;
`;

interface Props {
  label: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  const { label, onClick } = props;
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
