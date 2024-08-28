import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export const DMenuButton = ({
  rightIcon,
  leftIcon,
  borderWidth,
  pl,
  onChange,
  colorScheme,
  bgColor,
  color,
  name,
  menus,
  _hover,
  _active,
}) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        {...{
          _active,
          _hover,
          rightIcon,
          leftIcon,
          borderWidth,
          pl,
          colorScheme,
          bgColor,
          color,
        }}
      >
        {name}
      </MenuButton>
      <MenuList>
        {menus.map((item, i) => (
          <MenuItem
            icon={item.icon}
            onClick={() => onChange(item.value)}
            key={i}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
