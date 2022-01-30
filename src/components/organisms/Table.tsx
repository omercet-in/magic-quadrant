import React, { useContext } from 'react';
import styled from 'styled-components';

import { Item } from '../../common/model';

import Button from '../atoms/Button';
import TableHeader from '../molecules/TableHeader';
import TableRow from '../molecules/TableRow';

import ItemContext from '../../contexts/ItemContext';

const AddButtonContainer = styled.div`
  width: 60px;
`;

const Table = () => {
  const { items, addItem } = useContext(ItemContext);

  return (
    <div>
      <AddButtonContainer>
        <Button label="Add" onClick={addItem} />
      </AddButtonContainer>
      <TableHeader />
      {items.map((item: Item, index: number) => (
        <TableRow
          key={index}
          index={index}
          label={item.label}
          vision={item.vision}
          ability={item.ability}
        />
      ))}
    </div>
  );
};

export default Table;
