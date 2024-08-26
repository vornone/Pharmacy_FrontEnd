import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";
import ProductContainer from "./ProductContainer";

function ProductGrid() {
    const skeleton = [];
    for (let i = 0; i < 100; i++) {
        skeleton.push(i);
    }
  return (
    <SimpleGrid columns={{ sm:1, md: 2, lg: 4 }} spacing={5} width={"100%"}  rowGap={5}>
        {skeleton.map((item) => (
            <ProductContainer key={item}>
                <ProductCard />
            </ProductContainer>
        ))}
    </SimpleGrid>
  );
}

export default ProductGrid;
