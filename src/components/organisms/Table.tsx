import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import TableHeader from '../molecules/TableHeader';
import TableRow from '../molecules/TableRow';

const AddButtonContainer = styled.div`
  width: 60px;
`;

interface Row {
  label: string;
  vision: number;
  ability: number;
  onDelete(): void;
}

interface Props {
  rows: Row[];
}

const Table = (props: Props) => {
  const { rows } = props;
  return (
    <div>
      <AddButtonContainer>
        <Button
          label="Add"
          onClick={() => {
            console.log('hi there');
          }}
        />
      </AddButtonContainer>
      <TableHeader />
      {rows.map((row) => (
        <TableRow
          key={row.label}
          label={row.label}
          vision={row.vision}
          ability={row.ability}
          onDelete={row.onDelete}
        />
      ))}
    </div>
  );
};

export default Table;
