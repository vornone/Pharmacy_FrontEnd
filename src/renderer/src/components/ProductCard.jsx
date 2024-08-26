import { Card, CardBody, HStack, Image } from "@chakra-ui/react";
import React from "react";

function ProductCard() {
  return (
    <Card height={"200px"} borderRadius={0} overflow={"hidden"} width={'100%'}>
        <Image ></Image>
        <CardBody>
            <HStack justifyContent={"space-between"}>
            </HStack>
        </CardBody>
    </Card>
  );
}

export default ProductCard;
