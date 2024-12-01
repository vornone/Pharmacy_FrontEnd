import { Card, CardBody, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { serverUrl } from '../api-clients/api-clients'
const imgApi = serverUrl + '/images/'

function ProductCard({ props, eventhandler }) {
  return (
    <Card
      onClick={eventhandler}
      borderRadius={0}
      overflow="hidden"
      justifyContent="space-between"
      p={2}
      gap={3}
      height="100%" // Ensure card stretches fully
      display="flex"
      flexDirection="column"
    >
      <Image
        bg="gray.100"
        width="100%"
        height="130px"
        src={imgApi + props.product_img}
        borderRadius={5}
        objectFit="cover"
        objectPosition="center"
      />
      <CardBody p={0} display="flex" flexDirection="column" flex="1">
        <VStack justifyContent="space-between" width="100%" height="100%">
          <Text fontSize="md" textAlign="left" isTruncated as="b" width={'100%'}>
            {props.product_name}
          </Text>
          <HStack justifyContent="space-between" width="100%">
            <Text color="gray.400">{props.product_qty}</Text>
            <Text>${props.product_price}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default ProductCard
