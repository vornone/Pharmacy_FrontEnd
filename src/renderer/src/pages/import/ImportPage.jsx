import { HStack, VStack, Text, Heading } from '@chakra-ui/react'
import React from 'react'

function ImportPage() {
  return (
    <HStack w={'100%'} h={'full'}>
      <VStack
        w={'10%'}
        h={'full'}
        justify={'flex-start'}
        align={'flex-start'}
        borderRight={'1px solid'}
      >
        <Heading>Import Page</Heading>
        <Text>import</Text>
        <Text>import</Text>
      </VStack>
    </HStack>
  )
}

export default ImportPage
