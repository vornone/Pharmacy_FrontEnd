import { SimpleGrid, Grid, Stack, HStack,Text, VStack,Heading, Button,ButtonGroup } from "@chakra-ui/react";
import OrderCard from "./OrderCard";
import { TbPlus, TbMinus } from "react-icons/tb";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

function OrderList({orderData, setOrderData}) {
 

  return (
    <VStack
      columns={1}
      spacing={4}
      width={'100%'}
      height={'100%'}
      overflowY={'auto'}
      position={'relative'}
      paddingRight={'0'}
      rowGap={2}
      overflowX={'hidden'}
    >
      <AnimatePresence mode="popLayout">
        {
            orderData.map((item)=>(
              <motion.div
              style={{ width: "100%" }}
              layout
              initial={{ scale: 1, opacity: 0, x: -200 }}
              animate={{ scale: 1, opacity: 1,  x: 0}}
              exit={{ scale: 1, opacity: 0 , x: -200 }}
              transition={{ type: "spring" , duration: 1 }}
              key={item.name}
            >
                <OrderCard  data={item} orderData={orderData} setOrderData={setOrderData}/>
              </motion.div>
            ))
        }
      </AnimatePresence>
    </VStack>
  );
}

export default OrderList;
