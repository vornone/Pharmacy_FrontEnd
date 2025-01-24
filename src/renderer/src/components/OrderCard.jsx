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
import { serverUrl } from '../api-clients/api-clients'
import React, { useState } from 'react'
import { TbPlus, TbMinus, TbTrashFilled } from 'react-icons/tb'
import { useToast } from '@chakra-ui/react'
const imgApi = serverUrl + '/images/'
function OrderCard({ data, orderData, setOrderData }) {
  const toast = useToast()
  function deleteOrder() {
    data.orderQuantity = 0
    let newOrders = [...orderData].filter((item) => item.orderQuantity !== 0)
    setOrderData(newOrders)
  }
  function handleIncrement() {
    const a = [...orderData]
    data.orderQuantity >= data.product_qty
      ? toast({
          title: 'Error',
          description: 'item is out of stock',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      : (data.orderQuantity = data.orderQuantity + 1)
    setOrderData(a)
  }
  function handleDecrement() {
    const a = [...orderData]
    if (data.orderQuantity == 1) {
      deleteOrder()
    } else {
      data.orderQuantity = data.orderQuantity - 1
      setOrderData(a)
    }
  }
  return (
    <>
      {data.orderQuantity >= 1 ? (
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
              maxWidth={'100px'}
              minWidth={'100px'}
              src={imgApi + data.product_img}
              borderRadius={5}
              objectFit={'cover'}
              objectPosition={'center'}
            ></Image>

            <HStack width={'100%'} justifyContent={'space-between'}>
              <CardBody height={'100%'} p={0}>
                <HStack height={'100%'} width={'100%'}>
                  <VStack
                    width={'100%'}
                    alignItems={'left'}
                    justifyContent={'space-between'}
                    height={'100%'}
                    gap={0}
                  >
                    <Text size="sm" as={'b'}>
                      {data.product_name}
                    </Text>
                    <Text
                      color={'gray.400'}
                      textDecoration={data.product_discount > 0 ? 'line-through' : ''}
                    >
                      ${data.product_price.toFixed(2)}
                    </Text>
                    {data.product_discount > 0 ? (
                      <Flex gap={1}>
                        <Text color={'red.400'} fontSize={'sm'}>
                          (-{data.product_discount}%)
                        </Text>
                        <Text fontWeight={'bold'}>
                          {
                            (data.discount_price = (
                              data.product_price *
                              (1 - data.product_discount / 100)
                            ).toFixed(2))
                          }
                        </Text>
                      </Flex>
                    ) : (
                      <></>
                    )}
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
                      onClick={() => deleteOrder()}
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
