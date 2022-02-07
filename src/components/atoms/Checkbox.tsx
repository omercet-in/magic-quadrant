import React, { SyntheticEvent } from 'react';
import { stayInBoundries } from '../../common/utils';

interface Props {
  value: boolean;
  onUpdate(value: boolean): void;
}

const Checkbox = (props: Props) => {
  const { value, onUpdate } = props;
  const [checked, setChecked] = React.useState(value);

  const onChange = () => {
    setChecked(!checked);
    onUpdate(!checked);
  };

  return <input type="checkbox" checked={checked} onChange={onChange}></input>;
};

export default Checkbox;
