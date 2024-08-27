import { Card, CardBody, HStack, Image, Text, Heading, VStack, CardFooter, Button, Stack, Box, Flex, ButtonGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, Input, Show } from "@chakra-ui/react";
import React, { useState } from "react";
import { TbPlus , TbMinus, TbTrashFilled } from "react-icons/tb";

function OrderCard({...props}) {
    const [count, setCount] = useState(1);
    const handleIncrement = () => {
        count==props.stock? alert('out of stock'):setCount(count + 1);
      };
      const handleDecrement = () => {
        count==1? alert('you sure?'):setCount(count - 1);
      };
    
  return (<>
    {count!==0? <Show>
    <Card
    height={'75px'}
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  p={2}>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '100px' }}
    src={props.image}
  />

  <HStack width={'100%'} justifyContent={'space-between'}>
    <CardBody height={'100%'} p={0}>
       <HStack height={'100%'} width={'100%'} >
        <VStack width={'100%'} alignItems={'left'} justifyContent={'space-between'} height={'100%'}>
            <Heading size='md'>{props.name}</Heading>
            <Text>{props.price}</Text>
        </VStack>
        <VStack width={'50%'}   height={'100%'}  alignItems={"flex-end"} justifyContent={"space-between"}  >
            <Button  size={'xs'} variant={'solid'} colorScheme="red" ><TbTrashFilled/></Button>
            <Flex width={'100%'}  alignItems={'center'} justifyContent={'flex-end'}  >
                    <Button  size={'xs'} onClick={handleDecrement} variant={'outline'}><TbMinus/></Button>
                    <Text width={'50px'} textAlign={'center'}>{count}</Text>
                    <Button  size={'xs'} onClick={handleIncrement} variant={'outline'}><TbPlus/></Button>
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
