import React, { memo } from 'react'
import { Card, CardBody, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { serverUrl } from '../api-clients/api-clients'

const imgApi = serverUrl + '/images/'

const ProductCard = memo(
  function ProductCard({ props, eventhandler }) {
    const { product_img, product_name, product_qty, product_price, product_discount } = props

    return (
      <Card
        onClick={eventhandler}
        borderRadius={5}
        overflow="hidden"
        justifyContent="space-between"
        p={2}
        gap={3}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Image
          bg="gray.100"
          width="100%"
          height="150px"
          src={`${imgApi}${product_img}`}
          borderRadius={5}
          objectFit="cover"
          objectPosition="center"
          alt={product_name}
        />
        <CardBody p={0} display="flex" flexDirection="column" flex="1">
          <VStack justifyContent="space-between" width="100%" height="100%">
            <Flex width={'100%'}>
              <Text fontSize="md" textAlign="left"  fontWeight="bold" width="100%">
                {product_name}
              </Text>
              {product_discount > 0 && (
                <Text
                  fontSize="md"
                  textAlign="right"
                  isTruncated
                  fontWeight="bold"
                  width="100%"
                  color={'red.400'}
                >
                  -{product_discount}%
                </Text>
              )}
            </Flex>

            <HStack justifyContent="space-between" width="100%">
              <Text color="gray.400" size={'sm'}>
                {product_qty}
              </Text>
              <Flex>
                {product_discount > 0 ? (
                  <>
                    <Text color="gray.400" textDecoration="line-through" mr={2}>
                      ${product_price}
                    </Text>

                    <Text>${(product_price * (1 - product_discount / 100)).toFixed(2)}</Text>
                  </>
                ) : (
                  <Text>${product_price}</Text>
                )}
              </Flex>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.props.product_id === nextProps.props.product_id &&
      prevProps.eventhandler === nextProps.eventhandler
    )
  }
)

export default ProductCard
