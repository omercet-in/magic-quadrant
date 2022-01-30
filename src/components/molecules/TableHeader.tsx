import React from 'react';
import styled from 'styled-components';
import { LABEL } from '../../common/constants';
import ColumnName from '../atoms/ColumnName';

const HeaderContainer = styled.div`
  display: flex;
`;

const ColumnNameContainer = styled.div<{ size: number }>`
  display: flex;
  flex: ${(props) => props.size};
`;

const TableHeader = () => {
  return (
    <HeaderContainer>
      <ColumnNameContainer size={3}>
        <ColumnName label={LABEL.LABEL}></ColumnName>
      </ColumnNameContainer>
      <ColumnNameContainer size={1}>
        <ColumnName label={LABEL.VISION}></ColumnName>
      </ColumnNameContainer>
      <ColumnNameContainer size={1}>
        <ColumnName label={LABEL.ABILITY}></ColumnName>
      </ColumnNameContainer>
      <ColumnNameContainer size={1}>
        <ColumnName label={LABEL.DELETE}></ColumnName>
      </ColumnNameContainer>
    </HeaderContainer>
  );
};

export default TableHeader;
