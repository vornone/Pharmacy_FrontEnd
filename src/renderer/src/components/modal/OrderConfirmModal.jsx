import React from 'react'
import { Flex, ListIcon, ListItem, List, Input, Button } from '@chakra-ui/react'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react'
function OrderConfirmModal({ orderData, orderCalculation, orderInfo }) {
  return (
    <VStack w="full" h="full" p={4} justify={'center'}>
      <Input placeholder="Customer Name" />
      <Input placeholder="Customer Address" />
      <Input placeholder="Phone Number" />
      <Box
        w="full"
        maxH={'600px'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
        overflowY={window.innerHeight < 600 ? 'scroll' : 'auto'}
      >
        <VStack align="start" spacing={3}>
          {/* Header */}
          <Text fontSize="xl" fontWeight="bold">
            Order Confirmation
          </Text>
          <Text fontSize="sm" color="gray.500">
            Order #12345 | Date: {new Date().toLocaleDateString()}
          </Text>

          <Divider />

          {/* Items */}
          <VStack align="start" spacing={2} w="full">
            {/* Table Header */}
            <HStack justify="space-between" w="full" fontWeight="bold">
              <Text flex={2}>Item</Text>
              <Text flex={1} textAlign="right">
                Qty
              </Text>

              <Text flex={1} textAlign="right">
                Price
              </Text>
              <Text flex={1} textAlign="right">
                Total
              </Text>
            </HStack>

            {/* Item Rows */}
            {orderData.map((item) => (
              <HStack key={item.product_id} justify="space-between" w="full">
                <Text flex={2}>{item.product_name}</Text>
                <Text flex={1} textAlign="right">
                  {item.orderQuantity}
                </Text>
                <Text flex={1} textAlign="right">
                  ${item.discount_price ? item.discount_price : item.product_price.toFixed(2)}
                </Text>
                <Text flex={1} textAlign="right">
                  $
                  {(item.discount_price
                    ? item.discount_price * item.orderQuantity
                    : item.product_price * item.orderQuantity
                  ).toFixed(2)}
                </Text>
              </HStack>
            ))}
          </VStack>

          <Divider />

          {/* Total */}
          <HStack justify="space-between" w="full">
            <Text fontSize={'md'} color={'gray.500'}>
              Subtotal
            </Text>
            <Text fontSize={'md'} color={'gray.500'}>
              ${orderCalculation.subTotal.toFixed(2)}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize={'md'} color={'gray.500'}>
              Discount
            </Text>
            <Text fontSize={'md'} color={'gray.500'}>
              ${orderCalculation.discountAmount}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize={'md'} color={'gray.500'}>
              VAT
            </Text>
            <Text fontSize={'md'} color={'gray.500'}>
              ${orderCalculation.tax.toFixed(2)}
            </Text>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="full">
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold">${orderCalculation.total.toFixed(2)}</Text>
          </HStack>

          {/* Footer */}
          <Text fontSize="sm" color="gray.500" textAlign="center" w="full">
            Thank you for your purchase!
          </Text>
        </VStack>
      </Box>
      <Button colorScheme="green" w="full" variant={'solid'}>
        Confirm
      </Button>
    </VStack>
  )
}

export default OrderConfirmModal
