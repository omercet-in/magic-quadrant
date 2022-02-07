export interface Item {
  id: string;
  label: string;
  vision: number;
  ability: number;
  checked: boolean;
}

export interface ItemContextProps {
  items: Item[];
  addItem(): void;
  deleteItem(id: string): void;
  updateLabel(id: string, label: string): void;
  updateVision(id: string, vision: number): void;
  updateAbility(id: string, ability: number): void;
  updateCheckbox(id: string, checked: boolean): void;
}
