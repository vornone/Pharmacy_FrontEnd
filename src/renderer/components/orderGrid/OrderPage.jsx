import { Field } from '@/components/ui/field'
import { Button, Flex, Heading, Input, Separator, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const OrderPage = () => {
  return (
    <Stack w={'100%'} h={'100%'} justify={'space-between'}>
      <Flex
        w="full"
        justify="space-between"
        gap={5}
        p={5}
        borderRadius={'sm'}
        boxShadow={'md'}
        _dark={{ bg: 'gray.950' }}
      >
        <Heading>
          Order Id:
          <Text fontSize={'sm'} color={'gray.400'}>
            000001
          </Text>
        </Heading>
      </Flex>
      <Flex w="full" justify="space-between" gap={5} p={5}></Flex>
      <Stack
        w="full"
        justify="space-between"
        gap={2}
        p={5}
        borderRadius={'sm'}
        boxShadow={'md'}
        _dark={{ bg: 'gray.950' }}
      >
        <Flex justify={'space-between'}>
          <Text fontSize={'sm'} color={'gray.400'}>
            SubTotal:
          </Text>
          <Text>$5000</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontSize={'sm'} color={'gray.400'}>
            Discount:
          </Text>
          <Text>$500</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontSize={'sm'} color={'gray.400'}>
            VAT:
          </Text>
          <Text>$450</Text>
        </Flex>
        <Flex gap={5}>
          <Input placeholder="Discount..." size={'sm'} _dark={{ border: '1px solid gray' }} />
          <Input placeholder="Deposit..." size={'sm'} _dark={{ border: '1px solid gray' }} />
        </Flex>
        <Flex justify={'space-between'} py={5}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            Total:
          </Text>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            $4450
          </Text>
        </Flex>
        <Button colorPalette={'green'} size={'lg'} variant={'solid'}>
          {' '}
          Place Order
        </Button>
      </Stack>
    </Stack>
  )
}

export default OrderPage
