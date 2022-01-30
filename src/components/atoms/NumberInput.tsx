import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { color } from '../../common/color';

const StyledInput = styled.input`
  height: 20px;
  width: 100%;
  border-radius: 4px;
  background-color: ${color.WHITE};
  border: 2px solid ${color.LIGHT_GREY};
  margin: 2px;
`;

interface Props {
  value: number;
  onUpdate(value: number): void;
}

const NumberInput = (props: Props) => {
  const { value, onUpdate } = props;

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    onUpdate(value);
  };

  return (
    <StyledInput
      type="number"
      min="0"
      max="100"
      defaultValue={value}
      onChange={onChange}></StyledInput>
  );
};

export default NumberInput;
