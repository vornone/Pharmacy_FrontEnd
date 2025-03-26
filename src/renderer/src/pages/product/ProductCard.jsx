import { Box, Button, Card, Flex, Image, Input, SelectRoot, VStack } from '@chakra-ui/react'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SegmentedControl } from '@/components/ui/segmented-control'
import React, { useRef, forwardRef, useState } from 'react'
import { Field } from '@/components/ui/field'
import { HiUpload } from 'react-icons/hi'
import SearchSelection from '@/renderer/src/components/autocomplete/SearchSelection'
import EditProductDialog from '@/renderer/src/components/dialog/product/EditProductDialog'
import { Badge } from "@chakra-ui/react"
const product_detail = [
  {
    product_name: 'Nue Camp',
    product_price: '100$',
    product_image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  }
]

const ProductCard = ({ product }) => {

  return (
    <>
        <EditProductDialog product={product}>
          <Card.Root maxH={'xs'} shadow={'lg'} borderRadius={0} p={2} gap={4}>
            <Image
              borderRadius={'sm'}
              src={`http://localhost:8080/images/${product.productImage}`}
              alt="Product Image"
              h={'70%'}
              objectFit="cover"
            />
            <Card.Body h={'30%'} w={'100%'} p={0}>
              <Card.Title fontSize={'md'} fontWeight={'medium'}>{product.productName}</Card.Title>
              <Card.Description fontSize={'xs'}>Price : 100$</Card.Description>
              <Flex flexDirection={'row-reverse'}>
                <Badge size={'sm'} variant={'surface'} colorPalette={'gray.500'}>{product.categoryName}</Badge>
                </Flex>
            </Card.Body>
          </Card.Root>
        </EditProductDialog>

    </>
  )
}

export default ProductCard
