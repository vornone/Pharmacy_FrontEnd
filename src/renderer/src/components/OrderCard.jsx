import { Card, CardBody, HStack, Image, Text, Heading, VStack, CardFooter, Button, Stack, Box, Flex, ButtonGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, Input, Show, useColorMode} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbPlus , TbMinus, TbTrashFilled } from "react-icons/tb";

function OrderCard({...props}) {

    
    const [count, setCount] = useState(1);

    const color = useColorMode()
    const handleIncrement = () => {
        count==props.stock? alert('out of stock'):setCount(count + 1);
        props.orderQuantity=count;
        console.log(props)
      };
      const handleDecrement = () => {
        count==1? alert('you sure?'):setCount(count - 1);
      };
    
  return (<>
    {count!==0? <Show>
    <Card
    width={'100%'}
      minHeight={'100px'}
      height={'100px'}
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    p={2}
    gap={'5%'}>
    <Image
          bg="gray.100"
          width={'200px'}
          height={'100%'}
          src={props.image}
          borderRadius={5}
          objectFit={'cover'}
          objectPosition={'center'}
        ></Image>

  <HStack width={'100%'} justifyContent={'space-between'}>
    <CardBody height={'100%'} p={1}>
       <HStack height={'100%'} width={'100%'} >
        <VStack width={'100%'} alignItems={'left'} justifyContent={'space-between'} height={'100%'}>
            <Heading size='sm' >{props.name}</Heading>
            <Text color={'gray.400'}>${props.price}</Text>
        </VStack>
        <VStack width={'50%'}   height={'100%'}  alignItems={"flex-end"} justifyContent={"space-between"}  >
            <Button  size={'xs'} variant={'solid'} colorScheme="red" ><TbTrashFilled/></Button>
            <Flex width={'100px'}  alignItems={'center'} justifyContent={'space-between'} >
                  <Button  size={'xs'} onClick={handleDecrement}  variant={'solid'}><TbMinus/></Button>
                  <Text width={'50px'} textAlign={'center'}>{count}</Text>
                  <Button  size={'xs'} onClick={handleIncrement}  variant={'solid'}><TbPlus/></Button>
            </Flex>
        </VStack>
       </HStack>
    </CardBody>
  </HStack>
</Card>
</Show>: <></>}</>
  );
}

export default OrderCard;
