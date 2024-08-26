import { Card, CardBody, HStack, Image, Text, Heading } from '@chakra-ui/react'
import React from 'react'

const Props = {
  id: 0,
  price: 0,
  name: '',
  image: '',
  stock: 0
}
function ProductCard({ ...props }) {
  return (
    <Card
      height={'100%'}
      borderRadius={0}
      overflow={'hidden'}
      justifyContent={'space-between'}
      p={2}
    >
      <Image
        bg="gray.100"
        width={'100%'}
        height={'100%'}
        src={props.image}
        borderRadius={5}
      ></Image>
      <CardBody p={0}>
        <Heading fontSize={'1xl'} style={{ textWrap: 'wrap' }} as={'p'}>
          {props.name}
        </Heading>
        <HStack justifyContent={'space-between'}>
          <Text>{props.stock}</Text>
          <Text color={'green.500'}>${props.price}</Text>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default ProductCard
