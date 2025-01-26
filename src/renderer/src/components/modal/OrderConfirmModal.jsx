import React from 'react'
import { Flex, ListIcon, ListItem, List } from '@chakra-ui/react'
import { IoMdCheckmarkCircle } from 'react-icons/io'

function OrderConfirmModal({ orderData, orderCalculation, orderInfo }) {
  return (
    <Flex>
      <List>
        {orderData.map((item) => (
          <ListItem>
            <ListIcon as={IoMdCheckmarkCircle} color="green.500" />
            name: {item.product_name}, qty: {item.orderQuantity}, ${item.product_price}
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}

export default OrderConfirmModal
