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
  value: string;
}

const TextInput = (props: Props) => {
  const { value } = props;
  return <StyledInput defaultValue={value}></StyledInput>;
};

export default TextInput;
