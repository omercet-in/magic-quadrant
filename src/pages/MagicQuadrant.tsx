import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    index: 0,
    label: 'Mock item 0',
    vision: 1,
    ability: 20
  },
  {
    index: 1,
    label: 'Mock item 1',
    vision: 50,
    ability: 30
  },
  {
    index: 2,
    label: 'Mock item 2',
    vision: 40,
    ability: 80
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
        index: items.length,
        label: LABEL.NEW_ITEM,
        vision: BOUNDARY_VALUES.MAX / 2,
        ability: BOUNDARY_VALUES.MAX / 2
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
