import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import ColumnName from '../atoms/ColumnName';
import NumberInput from '../atoms/NumberInput';
import TextInput from '../atoms/TextInput';

const RowContainer = styled.div`
  display: flex;
`;

const CellContainer = styled.div<{ size: number }>`
  display: flex;
  flex: ${(props) => props.size};
`;

interface Props {
  label: string;
  vision: number;
  ability: number;
  onDelete: () => void;
}

const TableHeader = (props: Props) => {
  const { label, vision, ability, onDelete } = props;
  return (
    <RowContainer>
      <CellContainer size={2}>
        <TextInput value={label}></TextInput>
      </CellContainer>
      <CellContainer size={1}>
        <NumberInput value={vision}></NumberInput>
      </CellContainer>
      <CellContainer size={1}>
        <NumberInput value={ability}></NumberInput>
      </CellContainer>
      <CellContainer size={1}>
        <Button label={'Delete'} onClick={onDelete}></Button>
      </CellContainer>
    </RowContainer>
  );
};

export default TableHeader;
