import { BsCheckAll } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

const menuItems = [
  {
    label: 'Fait marquant',
    icon: <IoMdAdd fontSize={20} size={'1.2rem'} color="red" />,
    value: 'fm',
  },
];

const vlItem = {
  label: 'Validation',
  icon: <BsCheckAll fontSize={20} size={'1.2rem'} color="green" />,
  value: 'vl',
};

export const getMenuItems = (validate) => {
  return validate ? [...menuItems, vlItem] : menuItems;
};
