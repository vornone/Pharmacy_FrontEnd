import React, { useState, useCallback, useMemo } from 'react'
import { SimpleGrid, VStack } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import ReactPaginate from 'react-paginate'
import ProductCard from './ProductCard'
import ProductContainer from './ProductContainer'
import '../css/pagination.css'

const ProductGrid = React.memo(({ data, addingOrder }) => {
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 15

  // Memoize current items and page count to prevent unnecessary recalculations
  const { currentItems, pageCount } = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage
    return {
      currentItems: data.slice(itemOffset, endOffset),
      pageCount: Math.ceil(data.length / itemsPerPage)
    }
  }, [data, itemOffset, itemsPerPage])

  // Memoize page click handler to prevent recreation on every render
  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length
      setItemOffset(newOffset)
    },
    [data.length, itemsPerPage]
  )

  return (
    <VStack height={'100%'} width={'100%'} justifyContent={'space-between'}>
      <VStack height={'100%'} width={'100%'} p={0}>
        <SimpleGrid
          templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(6, 1fr)' }}
          spacing={4}
          width={'100%'}
          position={'relative'}
          rowGap={2}
        >
          {currentItems.map((item) => (
            <ProductContainer key={item.product_id}>
              <ProductCard props={item} eventhandler={() => addingOrder(item)} />
            </ProductContainer>
          ))}
        </SimpleGrid>
      </VStack>
      <ReactPaginate
        onPageChange={handlePageClick}
        nextLabel={<IoIosArrowForward size={20} />}
        previousLabel={<IoIosArrowBack size={20} />}
        activeClassName={'item active '}
        breakClassName={'item break-me '}
        breakLabel={'...'}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={1}
        nextClassName={'item next '}
        pageCount={pageCount}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={1}
        previousClassName={'item previous'}
      />
    </VStack>
  )
})

export default ProductGrid
