import {
  Card,
  CardBody,
  HStack,
  Image,
  Text,
  Heading,
  VStack,
  Button,
  Flex,
  Show,
  useColorMode
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { TbPlus, TbMinus, TbTrashFilled } from 'react-icons/tb'
function OrderCard({ data, orderData, setOrderData }) {
  const [count, setCount] = useState(data.orderQuantity)
  const color = useColorMode()

  //functions
  function handleIncrement() {
    const a = [...orderData]
    data.orderQuantity >= data.stock
      ? alert('out of stock')
      : (data.orderQuantity = data.orderQuantity + 1)
    setCount(data.orderQuantity)
    setOrderData(a)
  }
  const handleDecrement = () => {
    const a = [...orderData]
    data.orderQuantity == 1 ? alert('you sure?') : (data.orderQuantity = count - 1)
    setCount(data.orderQuantity)
    setOrderData(a)
  }
  function deleteOrder(id) {
    const newOrders = [...orderData]
    newOrders.splice(id, 1)
    setOrderData(newOrders)
  }

  return (
    <>
      {count !== 0 ? (
        <Show>
          <Card
            width={'100%'}
            minHeight={'100px'}
            height={'100px'}
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            p={2}
            gap={'5%'}
          >
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
                <HStack height={'100%'} width={'100%'}>
                  <VStack
                    width={'100%'}
                    alignItems={'left'}
                    justifyContent={'space-between'}
                    height={'100%'}
                  >
                    <Heading size="sm">{data.name}</Heading>
                    <Text color={'gray.400'}>${data.price}</Text>
                  </VStack>
                  <VStack
                    width={'50%'}
                    height={'100%'}
                    alignItems={'flex-end'}
                    justifyContent={'space-between'}
                  >
                    <Button
                      size={'xs'}
                      variant={'solid'}
                      colorScheme="red"
                      onClick={() => deleteOrder(data.orderId)}
                    >
                      <TbTrashFilled />
                    </Button>
                    <Flex width={'100px'} alignItems={'center'} justifyContent={'space-between'}>
                      <Button size={'xs'} onClick={() => handleDecrement()} variant={'solid'}>
                        <TbMinus />
                      </Button>
                      <Text width={'50px'} textAlign={'center'}>
                        {data.orderQuantity}
                      </Text>
                      <Button size={'xs'} onClick={() => handleIncrement()} variant={'solid'}>
                        <TbPlus />
                      </Button>
                    </Flex>
                  </VStack>
                </HStack>
              </CardBody>
            </HStack>
          </Card>
        </Show>
      ) : (
        <></>
      )}
    </>
  )
}

export default OrderCard
