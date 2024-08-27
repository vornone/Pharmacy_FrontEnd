import { Card, CardBody, HStack, Image, Text, Heading, VStack } from '@chakra-ui/react'
import React from 'react'

const Props = {
  id: 0,
  price: 0,
  name: '',
  image: '',
  stock: 0
}
function ProductCard({ props, evenhandler}) {

  return (
    <Card
    onClick={evenhandler}
      height={'100%'}
      borderRadius={0}
      overflow={'hidden'}
      justifyContent={'space-between'}
      p={2}
      gap={'5%'}
    >
      <Image
        bg="gray.100"
        width={'100%'}
        height={125}
        src={props.image}
        borderRadius={5}
      ></Image>
      <CardBody height={'100%'} p={0} >
        <VStack justifyContent={'space-between'} width={'100%'} height={'100%'}>
          <Heading fontSize={'1xl'} style={{ textWrap: 'wrap' }} as={'p'} fontWeight={'normal'} width={'100%'}>
            {props.name}
          </Heading>
          <HStack justifyContent={'space-between'} width={'100%'} >
            <Text>{props.stock}</Text>
            <Text  >${props.price}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default ProductCard
