import { Badge, Box, Button, Card, HStack, Icon, Image, Text, VStack, Flex } from "@chakra-ui/react"
import { HiPlus, HiMinus } from "react-icons/hi";
import React, { useEffect } from "react";
const OrderCard = ({key, item, orderData, setOrderData }) => {
  const [quantity, setQuantity] = React.useState(item.product_quantity);
  function deleteOrder() {
    item.product_quantity = 0
    let newOrders = [...orderData].filter((item) => item.product_quantity !== 0)
    setOrderData(newOrders)
  }
  function handleIncrement() {
    const a = [...orderData]
    item.product_quantity = item.product_quantity + 1
    setOrderData(a)
  }
  function handleDecrement() {
    const a = [...orderData]
    if (item.product_quantity == 1) {
      deleteOrder()
    } else {
      item.product_quantity = item.product_quantity - 1
      setOrderData(a)
    }
  }
  return (
    <Card.Root flexDirection="row" w={"100%"} h={"100px"} key={key} shadow={"sm"} borderRadius={'md'} overflow={'hidden'} >
    <Image
      objectFit="cover"
      w="auto"
      h="100%"
      src={item.product_image}
      alt="Caffe Latte"
    />
    <Box h={'100%'} w={'100%'}  >
      <Card.Body h={'100%'} p={0} w={'100%'}>
        <VStack  justify={'space-between'} h={'100%'} p={2} align={'start'} >
          <VStack align={'start'}>
        <Text fontSize="md"  fontWeight={'light'} >{item.product_name}</Text>
        <Text fontSize="sm" color={'gray.400'}>{item.product_price}</Text>
        </VStack>
        <Flex gap={2} justify={'flex-end'} w={'100%'}>
        <Button size="2xs" colorPalette="red" variant="surface" onClick={()=> handleDecrement()}><Icon size={"2xs"}><HiMinus /></Icon></Button>
        <Text fontSize="sm" w={'20px'} textAlign={'center'}>{item.product_quantity}</Text>
        <Button size="2xs" colorPalette="green" variant="surface" onClick={()=> handleIncrement()}><Icon size={"2xs"} z><HiPlus /></Icon></Button>
        </Flex>
        </VStack>
      </Card.Body>
    </Box>
  </Card.Root>
  )
  
}
export default OrderCard