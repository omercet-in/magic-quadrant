import React, { useContext } from 'react';
import styled from 'styled-components';
import ItemContext from '../../contexts/ItemContext';
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
  index: number;
  label: string;
  vision: number;
  ability: number;
}

const TableHeader = (props: Props) => {
  const { index, label, vision, ability } = props;
  const { deleteItem, updateLabel, updateVision, updateAbility } = useContext(ItemContext);

  const onDelete = () => {
    deleteItem(index);
  };

  const onLabelUpdate = (value: string) => {
    updateLabel(index, value);
  };

  const onVisionUpdate = (value: number) => {
    updateVision(index, value);
  };

  const onAbilityUpdate = (value: number) => {
    updateAbility(index, value);
  };

  return (
    <RowContainer>
      <CellContainer size={3}>
        <TextInput value={label} onUpdate={onLabelUpdate}></TextInput>
      </CellContainer>
      <CellContainer size={1}>
        <NumberInput value={vision} onUpdate={onVisionUpdate}></NumberInput>
      </CellContainer>
      <CellContainer size={1}>
        <NumberInput value={ability} onUpdate={onAbilityUpdate}></NumberInput>
      </CellContainer>
      <CellContainer size={1}>
        <Button label={'Delete'} onClick={onDelete}></Button>
      </CellContainer>
    </RowContainer>
  );
};

export default TableHeader;
