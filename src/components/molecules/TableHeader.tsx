import React from 'react';
import styled from 'styled-components';
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
        <ColumnName label="Label"></ColumnName>
      </ColumnNameContainer>
      <ColumnNameContainer size={1}>
        <ColumnName label="Vision"></ColumnName>
      </ColumnNameContainer>
      <ColumnNameContainer size={1}>
        <ColumnName label="Ability"></ColumnName>
      </ColumnNameContainer>
      <ColumnNameContainer size={1}>
        <ColumnName label="Delete"></ColumnName>
      </ColumnNameContainer>
    </HeaderContainer>
  );
};

export default TableHeader;
