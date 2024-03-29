import React from 'react';
import styled from 'styled-components';

import { color } from '../../common/color';

const StyledDiv = styled.div`
  height: 20px;
  width: 100%;
  border-radius: 4px;
  background-color: ${color.LIGHT_BLUE};
  font-size: 12px;
  color: ${color.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

interface Props {
  label: string;
}

const ColumnName = (props: Props) => {
  const { label } = props;
  return <StyledDiv>{label}</StyledDiv>;
};

export default ColumnName;
