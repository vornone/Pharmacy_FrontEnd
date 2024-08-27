import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import OrderCard from "./OrderCard";

function OrderList() {
  return (
    <SimpleGrid
      columns={1}
      width={"100%"}
    >
        <OrderCard></OrderCard>
    </SimpleGrid>
  );
}

export default OrderList;
