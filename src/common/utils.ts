import { BOUNDARY_VALUES } from './constants';

export const stayInBoundries = (value: number) => {
  if (value < BOUNDARY_VALUES.MIN) {
    return BOUNDARY_VALUES.MIN;
  }
  if (value > BOUNDARY_VALUES.MAX) {
    return BOUNDARY_VALUES.MAX;
  }
  return value;
};
