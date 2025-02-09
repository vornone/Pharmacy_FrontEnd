import React, { useState } from 'react'
import {
  Grid,
  HStack,
  VStack,
  SimpleGrid,
  Flex,
  Input,
  Kbd,
  IconButton,
  Box
} from '@chakra-ui/react'
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from '@/components/ui/pagination'
import { InputGroup } from '@/components/ui/input-group'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import ProductCard from './ProductCard'
function ProductGrid() {
  const [page, setPage] = useState(1)
  const pageSize = 15
  const count = 102
  const items = new Array(count).fill(0).map((_, index) => <ProductCard key={index} />)
  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize
  const visibleItems = items.slice(startRange, endRange)
  return (
    <VStack
      spacing={4}
      align="center"
      w="full"
      h="full"
      justify="space-between"
      alignContent={'space-between'}
      gap={4}
    >
      <Flex w="full" justify="space-between">
        {' '}
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input placeholder="Search Product" w="50%" />
        </InputGroup>
        <IconButton variant={'outline'}>
          <LuSlidersHorizontal />
        </IconButton>
      </Flex>

      <SimpleGrid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={2}
        w="100%"
        h="90%"
        minH="0"
        flex="1"
      >
        {visibleItems}
      </SimpleGrid>

      <PaginationRoot
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={(e) => setPage(e.page)}
        variant="solid"
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

export default ProductGrid
