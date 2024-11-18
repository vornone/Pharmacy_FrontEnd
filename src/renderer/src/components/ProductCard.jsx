import { Card, CardBody, HStack, Image, Text, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { serverUrl } from '../api-clients/api-clients'
const imgApi = serverUrl + '/images/'
function ProductCard({ props, evenhandler }) {
  return (
    <Card
      onClick={evenhandler}
      borderRadius={0}
      overflow={'hidden'}
      justifyContent={'space-between'}
      p={2}
      gap={3}
    >
      <Image
        bg="gray.100"
        width={'100%'}
        maxHeight={'80px'}
        src={imgApi + props.product_img}
        borderRadius={5}
        objectFit={'cover'}
        objectPosition={'center'}
      ></Image>
      <CardBody p={0}>
        <VStack justifyContent={'space-between'} width={'100%'} height={'100%'}>
          <Text fontSize={'md'} style={{ textWrap: 'wrap' }} width={'100%'} as={'b'}>
            {props.product_name}
          </Text>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Text color={'gray.400'}>{props.product_minimum_stock}</Text>
            <Text>${props.product_price}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default ProductCard
