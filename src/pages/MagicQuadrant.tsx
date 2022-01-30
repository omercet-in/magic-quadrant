import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import nextId from 'react-id-generator';

import { BOUNDARY_VALUES, CHART, KEY, LABEL, TABLE } from '../common/constants';
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
  width: ${TABLE.WIDTH}px;
  height: ${TABLE.HEIGHT}px;
  margin-left: 20px;
`;

const ChartContainer = styled.div`
  width: ${CHART.WIDTH}px;
  height: ${CHART.HEIGHT}px;
`;

const mockItems: Item[] = [
  {
    id: nextId(),
    label: 'Mock item 0',
    vision: 1,
    ability: 20
  },
  {
    id: nextId(),
    label: 'Mock item 1',
    vision: 50,
    ability: 30
  },
  {
    id: nextId(),
    label: 'Mock item 2',
    vision: 40,
    ability: 80
  }
];

const MagicQuadrant = () => {
  const [items, setItems] = useState(mockItems);

  useEffect(() => {
    try {
      const tempItems = localStorage.getItem(KEY.ITEMS);

      console.log(tempItems);

      if (tempItems) {
        setItems(JSON.parse(tempItems));
      } else {
        setItems(mockItems);
      }
    } catch (e) {
      setItems(mockItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY.ITEMS, JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    setItems((items) => [
      ...items,
      {
        id: nextId(),
        label: LABEL.NEW_ITEM,
        vision: BOUNDARY_VALUES.MAX / 2,
        ability: BOUNDARY_VALUES.MAX / 2
      }
    ]);
  };

  const deleteItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const updateLabel = (id: string, label: string) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, label } : item)));
  };

  const updateVision = (id: string, vision: number) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, vision } : item)));
  };

  const updateAbility = (id: string, ability: number) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, ability } : item)));
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
