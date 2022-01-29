import React from 'react';
import styled from 'styled-components';
import { color } from '../../common/color';

const StyledInput = styled.input`
  height: 20px;
  width: 100%;
  border-radius: 4px;
  background-color: ${color.WHITE};
  border: 2px solid ${color.LIGHT_GREY};
  margin: 1px;
`;

interface Props {
  value: number;
}

const NumberInput = (props: Props) => {
  const { value } = props;
  return <StyledInput type="number" min="0" max="100" defaultValue={value}></StyledInput>;
};

export default NumberInput;
