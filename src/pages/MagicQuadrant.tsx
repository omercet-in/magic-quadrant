import React from 'react';
import styled from 'styled-components';
import Table from '../components/organisms/Table';

const MainContainer = styled.div`
  display: flex;
  height: ${window.innerHeight}px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 400px;
  height: 400px;
`;

const ChartContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
`;

const mockTable = [
  {
    label: 'Label',
    vision: 1,
    ability: 2,
    onDelete: () => {
      console.log('delete');
    }
  },
  {
    label: 'Label1',
    vision: 1,
    ability: 2,
    onDelete: () => {
      console.log('delete');
    }
  },
  {
    label: 'Label2',
    vision: 1,
    ability: 2,
    onDelete: () => {
      console.log(mockTable);
    }
  }
];

const MagicQuadrant = () => {
  return (
    <MainContainer>
      <ChartContainer />
      <TableContainer>
        <Table rows={mockTable} />
      </TableContainer>
    </MainContainer>
  );
};

export default MagicQuadrant;
