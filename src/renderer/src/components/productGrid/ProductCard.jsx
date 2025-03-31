import { Button, Card, Flex, HStack, Image, Text } from '@chakra-ui/react'

const ProductCard = () => {
  return (
    <Card.Root maxH={'xs'} shadow={'md'} borderRadius={15} p={2} gap={4} _dark={{ bg: 'gray.900' }}>
      <Image
        borderRadius={11}
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        h={'70%'}
      />
      <Card.Body h={'30%'} w={'100%'} p={0}>
        <Card.Title fontSize={'sm'}>Nue Camp</Card.Title>
        <Card.Description fontSize={'xs'}>100$</Card.Description>
      </Card.Body>
    </Card.Root>
  )
}
export default ProductCard
