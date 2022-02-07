/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from 'react';

import { ItemContextProps } from '../common/model';

const defaultValue: ItemContextProps = {
  items: [],
  addItem: () => {},
  deleteItem: () => {},
  updateLabel: () => {},
  updateVision: () => {},
  updateAbility: () => {},
  updateCheckbox: () => {}
};

const ItemContext = createContext<ItemContextProps>(defaultValue);

export default ItemContext;
