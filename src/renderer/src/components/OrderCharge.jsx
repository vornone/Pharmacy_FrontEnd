import React, { useState } from "react";
import { HStack, Heading, VStack, Text,Button,IconButton,Menu,MenuButton,MenuList,MenuItem,Card,Input,NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper, Icon,Show,InputGroup, InputRightElement,InputLeftElement } from "@chakra-ui/react";
import { TbPlus, TbEdit } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { RiDiscountPercentFill } from "react-icons/ri";


function OrderCharge({subTotal}) {
const [discount, setDiscount] = useState(0);

const discountAmount = parseFloat(discount*subTotal/100).toFixed(2);
const tax= parseFloat(((subTotal-discountAmount)*0.1).toFixed(2));
const total= (subTotal-tax-discountAmount).toFixed(2);
  return (
    <Card width={"100%"}>
        <HStack alignItems={"top"} justifyContent={"space-between"} width={"100%"}  p={3} borderRadius={10}>
            
            <VStack alignItems={"flex-start"} width={"100%"}>
                <HStack justifyContent={"space-between"} width={"100%"}>
                    <Text color={'gray.400'}>Subtotal:</Text>
                    <Text color={'gray.400'}>{subTotal}</Text>
                </HStack>
                <HStack justifyContent={"space-between"} width={"100%"}>
                    <Text color={'gray.400'}>Discount:</Text>
                    <Text color={'green.500'}>-{discountAmount}</Text>
                </HStack>
                <HStack justifyContent={"space-between"} width={"100%"}>
                    <Text color={'gray.400'}>Tax:</Text>
                    <Text color={'gray.400'}>{tax}</Text>
                </HStack>

                <HStack justifyContent={"space-between"} width={"100%"}>
                    <Text fontSize={'lg'}>Total:</Text>
                    <Text fontSize={'lg'}>{total}</Text>
                </HStack>
                <HStack justifyContent={"space-between"} width={"100%"} >  
                <InputGroup colorScheme="white"> 
                    <InputLeftElement children={<RiDiscountPercentFill />}></InputLeftElement>
                    <Input placeholder="Discount...." width={'100%'} shadow={'sm'} type="number" onChange={(e)=>setDiscount(e.target.value)}></Input>
                </InputGroup>
                <Button colorScheme="green" width={'100%'}>Confirm</Button>
                </HStack>
            </VStack>
        </HStack>
    </Card>
  );
}

export default OrderCharge;
