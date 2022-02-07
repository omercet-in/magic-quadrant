import React, { useContext } from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';
import NumberInput from '../atoms/NumberInput';
import TextInput from '../atoms/TextInput';

import ItemContext from '../../contexts/ItemContext';
import { LABEL } from '../../common/constants';
import Checkbox from '../atoms/Checkbox';

const RowContainer = styled.div`
  display: flex;
`;

const CellContainer = styled.div<{ size: number }>`
  display: flex;
  flex: ${(props) => props.size};
  justify-content: center;
  align-items: center;
`;

interface Props {
  id: string;
  label: string;
  vision: number;
  ability: number;
  checked: boolean;
}

const TableHeader = (props: Props) => {
  const { id, label, vision, ability, checked } = props;
  const { deleteItem, updateLabel, updateVision, updateAbility, updateCheckbox } =
    useContext(ItemContext);

  const onDelete = () => {
    deleteItem(id);
  };

  const onLabelUpdate = (value: string) => {
    updateLabel(id, value);
  };

  const onVisionUpdate = (value: number) => {
    updateVision(id, value);
  };

  const onAbilityUpdate = (value: number) => {
    updateAbility(id, value);
  };

  const onCheckboxUpdate = (value: boolean) => {
    updateCheckbox(id, value);
  };

  return (
    <RowContainer>
      <CellContainer size={0.3}>
        <Checkbox value={checked} onUpdate={onCheckboxUpdate} />
      </CellContainer>
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
        <Button label={LABEL.DELETE} onClick={onDelete}></Button>
      </CellContainer>
    </RowContainer>
  );
};

export default TableHeader;
