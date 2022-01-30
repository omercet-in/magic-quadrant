export interface Item {
  index: number;
  label: string;
  vision: number;
  ability: number;
}

export interface ItemContextProps {
  items: Item[];
  addItem(): void;
  deleteItem(index: number): void;
  updateLabel(index: number, label: string): void;
  updateVision(index: number, vision: number): void;
  updateAbility(index: number, ability: number): void;
}
