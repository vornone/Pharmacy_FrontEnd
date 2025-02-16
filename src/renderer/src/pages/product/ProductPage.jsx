import React, { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { VStack, SimpleGrid, Flex, Input, IconButton, Button, Box, HStack } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import ProductCard from './ProductCard'
import AddProductDialog from './AddProductDialog'
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from '@/components/ui/pagination'
import { InputGroup } from '@/components/ui/input-group'

function ProductPage() {
  const [page, setPage] = useState(1)
  const pageSize = 12
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 300)

  // Mock product data
  const products = new Array(102).fill(0).map((_, index) => ({
    id: index,
    name: `Product ${index + 1}`
  }))

  // Filter products based on debounced search term
  const filteredItems = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  // Reset pagination to page 1 when search term changes
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize
  const visibleItems = filteredItems
    .slice(startRange, endRange)
    .map((product) => <ProductCard key={product.id} product={product} />)

  return (
    <VStack
      spacing={4}
      align="center"
      w="full"
      h="full"
      justify="space-between"
      alignContent={'space-between'}
      gap={4}
      p={5}
    >
      <Flex w="full" justify="space-between">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search Product"
            w="50%"
            size={'xs'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <AddProductDialog>
          <Button variant={'surface'} colorPalette={'green'} size={'xs'}>
            Add Product
          </Button>
        </AddProductDialog>
      </Flex>

      <SimpleGrid
        templateColumns="repeat(6, 1fr)"
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
        count={filteredItems.length}
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

export default ProductPage
