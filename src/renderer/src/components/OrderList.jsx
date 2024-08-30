import { SimpleGrid, Grid, Stack, HStack,Text, VStack,Heading, Button,ButtonGroup } from "@chakra-ui/react";
import React from "react";
import OrderCard from "./OrderCard";
import { TbPlus, TbMinus } from "react-icons/tb";


function OrderList({data}) {
 

  return (
    <VStack
      columns={1}
      spacing={4}
      width={'100%'}
      height={'100%'}
      overflowY={'auto'}
      position={'relative'}
      paddingRight={'1%'}
      rowGap={2}
    >
        {
            data.map((item)=>(
                <OrderCard key={item.name} data={item} orderData={data}/>
            ))
        }
    </VStack>
  );
}

export default OrderList;
