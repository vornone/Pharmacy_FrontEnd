import { Grid, GridItem, HStack, VStack, Flex, useColorModeValue, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import MenuBar from '../components/MenuBar'
import ProductGrid from '../components/ProductGrid'
import SearchInput from '../components/SearchInput'
import ProductFilter from '../components/ProductFilter'
import ProductSort from '../components/ProductSort'
import OrderList from '../components/OrderList'
import OrderHeader from '../components/OrderHeader'
import OrderCharge from '../components/OrderCharge'
import useProduct from '../hooks/useProduct'
import { useToast } from '@chakra-ui/react'
import { Toast } from '@chakra-ui/react'
export default function MainPage() {
  const { data, loading, error, getProduct } = useProduct()

  const [orders, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState('') // State for the search query
  const colorGenre = useColorModeValue('gray.100', 'gray.800')
  const colorMainBg = useColorModeValue('gray.50', 'gray.900')
  const toast = useToast()

  // Fetch products on component mount
  useEffect(() => {
    getProduct()
  }, [])

  // Filter products based on the search query
  const filteredData = data?.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  // Update search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Add product to orders
  const addingOrder = (e) => {
    const newOrders = [...orders]
    const existedData = newOrders.some((item) => item.product_name === e.product_name)

    if (existedData) {
      const updatedOrders = newOrders.map((item) => {
        if (item.product_name === e.product_name && item.orderQuantity < item.product_qty) {
          return { ...item, orderQuantity: item.orderQuantity + 1 }
        }
        if (item.product_name === e.product_name && item.orderQuantity >= item.product_qty) {
          toast({
            title: 'Error',
            description: 'Item is out of stock',
            status: 'error',
            duration: 3000,
            isClosable: true
          })
        }
        return item
      })
      setOrders(updatedOrders)
    } else {
      const newProduct = { ...e, orderQuantity: 1 }
      setOrders([...newOrders, newProduct])
    }
  }

  return (
    <Grid
      bg={colorMainBg}
      boxSizing="border-box"
      width={'100%'}
      height={'100%'}
      paddingX={'1%'}
      paddingBottom={'1%'}
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "main main"`
      }}
      templateColumns={{
        base: '1fr',
        lg: 'auto 1fr'
      }}
      templateRows={{
        base: 'auto 1fr',
        lg: 'auto 1fr'
      }}
    >
      <GridItem area="header" pb={'1%'} pt={'1%'} borderRadius={'10px'}>
        <Flex flexDirection={'column'} gap={'1%'} width={'100%'} justifyContent={'space-between'}>
          <NavBar />
          <MenuBar orderData={orders} setOrderData={setOrders} />
        </Flex>
      </GridItem>

      <GridItem area="main" width={'100%'} height={'82dvh'} borderRadius={'10px'}>
        <HStack width={'100%'} height={'100%'} justifyContent={'space-between'}>
          <VStack
            padding={'1%'}
            bg={colorGenre}
            width={'100%'}
            height={'100%'}
            borderRadius={'10px'}
            justifyContent={'flex-start'}
          >
            <HStack justifyContent={'space-between'} width={'100%'}>
              <SearchInput
                placeholder={'Search Product'}
                handleChange={handleSearchChange} // Handle input change
              />
              <ProductSort />
              <ProductFilter />
            </HStack>

            {error || data === undefined ? (
              <h1>{error}</h1>
            ) : loading ? (
              <Spinner />
            ) : (
              <ProductGrid data={filteredData} addingOrder={addingOrder} />
            )}
          </VStack>

          <VStack
            bg={colorGenre}
            width={'40%'}
            height={'100%'}
            justify={'space-between'}
            borderRadius={'10px'}
            p={'1%'}
          >
            <OrderHeader />
            <OrderList orderData={orders} setOrderData={setOrders} />
            <OrderCharge data={orders} />
          </VStack>
        </HStack>
      </GridItem>
    </Grid>
  )
}
