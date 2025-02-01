import { Box, Flex, Menu, MenuButton, MenuItem, MenuList,HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorMode } from "@chakra-ui/react";
// import { STATUSES } from "../data";


export const ColorIcon = ({ color, ...props }) => (
  <Box w="8px" h="8px" bg={color} borderRadius="full" {...props} />
);

const DynamicStatus = (high,mid,low,status) => {
    const [value, setValue] = useState(status);
    const selectedStatus = () => {
      if (value === "high") {
        return high;
      } else if (value === "mid") {
        return mid;
      } else if (value === "low") {
        return low;
      }
    }
  return (
    
      <Text>
        {value}
      </Text>
      
  

  );
};
export default DynamicStatus;
