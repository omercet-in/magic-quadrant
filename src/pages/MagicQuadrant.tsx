import React, { useState } from 'react';
import styled from 'styled-components';
import { Item } from '../common/model';
import ScatterChart from '../components/organisms/ScatterChart';
import Table from '../components/organisms/Table';
import ItemContext from '../contexts/ItemContext';

const MainContainer = styled.div`
  display: flex;
  height: ${window.innerHeight}px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 500px;
  height: 400px;
  margin-left: 20px;
`;

const ChartContainer = styled.div`
  width: 400px;
  height: 400px;
`;

const mockTable: Item[] = [
  {
    index: 0,
    label: 'Label',
    vision: 1,
    ability: 20
  },
  {
    index: 1,
    label: 'Label1',
    vision: 50,
    ability: 30
  },
  {
    index: 2,
    label: 'Label2',
    vision: 40,
    ability: 80
  }
];

const MagicQuadrant = () => {
  const [items, setItems] = useState(mockTable);

  const addItem = () => {
    setItems((items) => [
      ...items,
      {
        index: items.length,
        label: 'new',
        vision: 50,
        ability: 50
      }
    ]);
  };

  const deleteItem = (index: number) => {
    setItems((items) => items.filter((item, i) => i !== index));
  };

  const updateLabel = (index: number, label: string) => {
    setItems((items) => items.map((item, i) => (i === index ? { ...item, label } : item)));
  };

  const updateVision = (index: number, vision: number) => {
    setItems((items) => items.map((item, i) => (i === index ? { ...item, vision } : item)));
  };

  const updateAbility = (index: number, ability: number) => {
    setItems((items) => items.map((item, i) => (i === index ? { ...item, ability } : item)));
  };

  return (
    <ItemContext.Provider
      value={{ items, addItem, deleteItem, updateLabel, updateVision, updateAbility }}>
      <MainContainer>
        <ChartContainer>
          <ScatterChart />
        </ChartContainer>
        <TableContainer>
          <Table />
        </TableContainer>
      </MainContainer>
    </ItemContext.Provider>
  );
};

export default MagicQuadrant;
