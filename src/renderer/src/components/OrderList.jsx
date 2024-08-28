import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import OrderCard from "./OrderCard";


function OrderList({data}) {
 

  return (
    <SimpleGrid
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
                <OrderCard key={item.name} {...item}/>
            ))
        }
    </SimpleGrid>
  );
}

export default OrderList;
