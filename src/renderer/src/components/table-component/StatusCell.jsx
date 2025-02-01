import { Box, Flex, Menu, MenuButton, MenuItem, MenuList,HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorMode } from "@chakra-ui/react";
// import { STATUSES } from "../data";

const status =[
  {
    id: 1,
    name: "expired",
    color: "orange.400",
    bg: "orange",
  },
  {
    id: 2,
    name: "good",
    color: "green.400",
    bg: "green",
  }
  ,{
    id: 3,
    name: "low stock",
    color: "red.400",
    bg: "red",
  }
]
export const ColorIcon = ({ color, ...props }) => (
  <Box w="8px" h="8px" bg={color} borderRadius="full" {...props} />
);

const StatusCell = () => {

    const [value, setValue] = useState(status[0].id);
    const [name, setName] = useState(status[0].name);
    const color = status.find((s) => s.id === value)?.color;
    const colorBg = status.find((s) => s.id === value)?.bg;
  
    const eventClick = (event) => {
      setName(event.name);
      color && setValue(event.id);
      colorBg && setValue(event.id);
    }
  // const { name, color } = getValue() || {};
  // const { updateData } = table.options.meta;
  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false} defaultValue={status[1].id}> 
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        borderRadius={5}
        p={1.5}
        bg={color ? colorBg : "transparent"}
      >
        <HStack >  <ColorIcon color={color}  /> <Text fontSize={"sm"} color={'white'} >{name}</Text></HStack>


      </MenuButton>
      <MenuList defaultValue={status[0].id} autoSelect={false}  >

        {status.map((status) => (
          <MenuItem
            key={status.id}
            onClick={() => {
              eventClick(status);
            }}
          >
            <ColorIcon color={status.color} mr={3} />
            <Text>{status.name}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default StatusCell;
