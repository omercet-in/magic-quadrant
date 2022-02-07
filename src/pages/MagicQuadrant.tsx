import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

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
    id: nanoid(),
    label: 'Mock item 0',
    vision: 1,
    ability: 20,
    checked: false
  },
  {
    id: nanoid(),
    label: 'Mock item 1',
    vision: 50,
    ability: 30,
    checked: false
  },
  {
    id: nanoid(),
    label: 'Mock item 2',
    vision: 40,
    ability: 80,
    checked: false
  }
];

const MagicQuadrant = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const tempItems = localStorage.getItem(KEY.ITEMS);

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
        id: nanoid(),
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

  const updateCheckbox = (id: string, checked: boolean) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, checked } : item)));
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        addItem,
        deleteItem,
        updateLabel,
        updateVision,
        updateAbility,
        updateCheckbox
      }}>
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
