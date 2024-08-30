import React, { useState } from "react";
import { HStack, Heading, VStack, Text,Button,IconButton,Menu,MenuButton,MenuList,MenuItem,Card } from "@chakra-ui/react";
import { TbPlus, TbEdit } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";

function OrderHeader() {
    const data = [
        {
          menuId: 1,
          menuName: 'Walk in'
        },
        {
          menuId: 2,
          menuName: 'Delivery'
        },]
    const [platform, setPlatform] = useState(data[0].menuName)
    const platformSelectorEvent = (e) => {
      setPlatform(e.menuName)
    }

  return (
    <Card width={"100%"}>
        <HStack alignItems={"top"} justifyContent={"space-between"} width={"100%"}  p={3} borderRadius={10}>
            
            <VStack alignItems={"flex-start"}>
                <Text fontSize={'2xl'} fontWeight={'medium'}>New Order</Text>
                <Text color={'gray.400'}>Order Number: #0000</Text>
                <Menu autoSelect={false}>
            <MenuButton
            as={Button}
            rightIcon={<BsChevronDown />}
            variant={'solid'}
            size={'sm'}
            width={120}
            colorScheme="gray"
            >
            <Text fontWeight={'regular'} >{platform}</Text>
            </MenuButton>
            <MenuList>
            {data.map((data) => (
                <MenuItem key={data.menuId} onClick={() => platformSelectorEvent(data)}>
                {data.menuName}
                </MenuItem>
            ))}
            </MenuList>
        </Menu>
            </VStack>
            <IconButton size="md" colorScheme="gray" icon={<TbEdit />} borderRadius={"full"}></IconButton>
        </HStack>
    </Card>
  );
}

export default OrderHeader;
