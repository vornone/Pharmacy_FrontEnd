import { Card, CardBody, HStack, Image, Text, Heading, VStack, CardFooter, Button, Stack, Box, Flex, ButtonGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, Input, Show, useColorMode} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbPlus , TbMinus, TbTrashFilled } from "react-icons/tb";
function OrderCard({data, orderData}) {
    const [count, setCount] = useState(1);
    const [newData, setNewData] = useState([...orderData])
    const color = useColorMode()
    const handleIncrement = () => {
        const a = [...newData];
        count==data.stock? alert('out of stock'):setCount(count + 1);
        data.orderQuantity=count+1;
        setNewData(a);
        console.log(data)
        console.log(orderData)
      };
      const handleDecrement = () => {
        const a = [...newData];
        count==1? alert('you sure?'):setCount(count - 1);
        data.orderQuantity=count;
        setNewData(a);
        console.log(data)
        console.log(orderData)
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
          src={data.image}
          borderRadius={5}
          objectFit={'cover'}
          objectPosition={'center'}
        ></Image>

  <HStack width={'100%'} justifyContent={'space-between'}>
    <CardBody height={'100%'} p={1}>
       <HStack height={'100%'} width={'100%'} >
        <VStack width={'100%'} alignItems={'left'} justifyContent={'space-between'} height={'100%'}>
            <Heading size='sm' >{data.name}</Heading>
            <Text color={'gray.400'}>${data.price}</Text>
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
