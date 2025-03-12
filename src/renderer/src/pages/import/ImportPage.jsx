import { HStack, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import ImportTable from '@/renderer/src/components/table/ImportTable'
import SupplierTable from '@/renderer/src/components/table/SupplierTable'
import useSupplier from '../../hooks/useSupplier'
import LoadingScreen from '@/renderer/src/components/loadingscreen/LoadingScreen'

function ImportPage() {
  const { data, loading, error, getSupplier } = useSupplier()
  const [activeItem, setActiveItem] = useState('ImportTable')
  const [pagination, setPagination] = useState({pageSize: 4, pageNumber: 1})

  useEffect(() => {
    console.log(pagination)
    getSupplier({
      pageSize: pagination.pageSize,
      pageNumber: pagination.pageNumber})
  },[])
  return (
    <LoadingScreen error={error} isLoading={loading} >
    <Flex w={'100%'} h={'100%'}>
      <VStack
        w={'15%'}
        h={'100%'}
        align={'start'}
        borderRight={'1px solid '}
        borderRightColor={'gray.200'}
        _dark={{ borderRightColor: 'gray.600' }}
      >
        <Flex
          borderBottom={'1px solid'}
          width="100%"
          borderBottomColor={'gray.200'}
          _dark={{ borderBottomColor: 'gray.600' }}
          px={5}
          py={3.5}
        >
          <Heading>Import Page</Heading>
        </Flex>
        <VStack p={5} w={'100%'}>
          <Button
            justifyContent={'start'}
            w={'full'}
            size={'xs'}
            variant={'ghost'}
            onClick={() => setActiveItem('ImportTable')}
            bg={activeItem === 'ImportTable' ? 'gray.200' : 'transparent'}
            _dark={{ bg: activeItem === 'ImportTable' ? 'gray.800' : 'transparent' }}
          >
            Import Table
          </Button>
          <Button
            justifyContent={'start'}
            w={'full'}
            size={'xs'}
            variant={'ghost'}
            onClick={() => setActiveItem('SupplierTable')}
            bg={activeItem === 'SupplierTable' ? 'gray.200' : 'transparent'}
            _dark={{ bg: activeItem === 'SupplierTable' ? 'gray.800' : 'transparent' }}
          >
            Supplier Table
          </Button>
        </VStack>
      </VStack>
      <VStack w={'80%'} h={'100%'} p={5}>
        {activeItem === 'ImportTable' ? <ImportTable /> : <SupplierTable supplierData={data || []} />}
      </VStack>
    </Flex>
    </LoadingScreen>
  )
}

export default ImportPage
