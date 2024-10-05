import { SimpleGrid, Flex, VStack } from '@chakra-ui/react'
import '../css/pagination.css'
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import ProductContainer from './ProductContainer'
import ReactPaginate from 'react-paginate'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

function ProductGrid({ data, addingOrder }) {
  const [itemOffset, setItemOffset] = useState(0)

  const itemsPerPage = 15

  const endOffset = itemOffset + itemsPerPage
  const currentItems = data.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(data.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length
    setItemOffset(newOffset)
  }
  return (
    <VStack height={'100%'} width={'100%'} justifyContent={'space-between'}>
      <VStack height={'100%'} width={'100%'} p={0}>
        <SimpleGrid
          borer={1}
          templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
          spacing={4}
          width={'100%'}
          position={'relative'}
          rowGap={2}
        >
          {currentItems.map((item) => (
            <ProductContainer key={item.id}>
              <ProductCard props={item} evenhandler={() => addingOrder(item)} />
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
}

export default ProductGrid
