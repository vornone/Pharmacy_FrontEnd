import React, { useState } from 'react'
import OrderCard from './OrderCard'
import {Flex, Stack, Box, VStack} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

const orderData = [
     {
        product_id: 1,
        product_name: 'Product 1',
        product_image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        product_price: ['100$'],
        product_quantity: 1
     },
     {
        product_id: 2,
        product_name: 'Product 2',
        product_image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        product_price: ['100$'],
        product_quantity: 1
     },
     {
        product_id: 3,
        product_name: 'Product 3',
        product_image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        product_price: ['100$'],
        product_quantity: 1
     }
]
const OrderGrid = ({data}) => {
    const [orders, setOrders] = useState([...orderData])

  return (
    <VStack         columns={1}
    spacing={4}
    width={'100%'}
    height={'100%'}
    overflowY={'auto'}
    position={'relative'}
    paddingRight={'0'}
    rowGap={2}
    overflowX={'hidden'} >
        <AnimatePresence>

      {orders.map((item) => (
        <motion.div
        style={{ width: '100%' }}
        layout
        initial={{ scale: 1, opacity: 0, x: -200 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 1, opacity: 0, x: -200 }}
        transition={{ type: 'spring', duration: 1 }}
        key={item.product_name}
      >
        <OrderCard key={'order-' + 	item.product_id} item={item}  orderData={orders} setOrderData={setOrders}/>
        </motion.div>
      ))}
      
      </AnimatePresence>
    </VStack>
  )
}

export default OrderGrid