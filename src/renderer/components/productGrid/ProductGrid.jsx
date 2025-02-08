import React, { useState } from "react";
import { Grid, HStack, VStack,SimpleGrid } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import ProductCard from './ProductCard';
function ProductGrid() {
  const [page, setPage] = useState(1)
  const pageSize =12;
  const count = 102;
  const items = new Array(count)
    .fill(0)
    .map((_, index) => <ProductCard key={index} />)
  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize
  const visibleItems = items.slice(startRange, endRange)
  return (
    <VStack spacing={4} align="center" w="full" h ="full" justify="space-between" alignContent={"space-between"}>
      <SimpleGrid
        templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={4}
        w="full"
        h={'50%'}
        flex="1"


      >
        {visibleItems}
      </SimpleGrid>
      <PaginationRoot
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => setPage(e.page)}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </VStack>
  )
}

export default ProductGrid;