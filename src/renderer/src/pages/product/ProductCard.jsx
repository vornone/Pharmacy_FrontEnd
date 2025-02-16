import { Box, Button, Card, Image, Input, SelectRoot, VStack } from '@chakra-ui/react'
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
import SearchSelection from '@/renderer/components/searchSelection/SearchSelection'
const product_detail = [
  {
    product_name: 'Nue Camp',
    product_price: '100$',
    product_image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  }
]
const mainOption = [
  { label: 'POS System', value: 'POS System' },
  { label: 'Inventory', value: 'Inventory' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Customer Management', value: 'Customer Management' },
  { label: 'HR Management', value: 'HR Management' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Support', value: 'Support' }
]
const ProductCard = ({ product }) => {
  const [isEditable, setIsEditable] = React.useState(false)
  const [imagePreview, setImagePreview] = useState(product_detail[0].product_image)
  const [uploadedImage, setUploadedImage] = useState(null)
  const handleUploadClick = () => {
    inputRef.current.click()
  }
  const inputRef = useRef(null)
  const handleUploadFile = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file)
      setImagePreview(URL.createObjectURL(file))
    } else {
      toast.error('Please select an image file.')
    }
  }
  return (
    <>
      <Input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleUploadFile} />

      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>
          <Card.Root maxH={'xs'} shadow={'lg'} borderRadius={0} p={2} gap={4}>
            <Image
              borderRadius={'sm'}
              src={product_detail[0].product_image}
              alt="Product Image"
              h={'70%'}
              objectFit="cover"
            />
            <Card.Body h={'30%'} w={'100%'} p={0}>
              <Card.Title fontSize={'sm'}>{product.name}</Card.Title>
              <Card.Description fontSize={'xs'}>Price : 100$</Card.Description>
            </Card.Body>
          </Card.Root>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Detail</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack w={'100%'} h={'100%'} p={5} align={'flex-start'}>
              <Image src={imagePreview} w={'150px'} h={'150px'} objectFit="cover" />
              <Button onClick={handleUploadClick} size={'xs'} disabled={!isEditable}>
                <HiUpload /> Edit Image
              </Button>
              <Field label="Product name">
                <Input
                  name="product_name"
                  defaultValue={product.name}
                  disabled={!isEditable}
                  size="xs"
                />
              </Field>
              <Field label="Product size">
                <SegmentedControl defaultValue="XS" items={['XS', 'S', 'M', 'L', 'XL']} size="xs" />
              </Field>
              <Field label="Product price">
                <Input
                  name="product_price"
                  defaultValue={product_detail[0].product_price}
                  disabled={!isEditable}
                  size="xs"
                />
              </Field>
              <Field label="Product Color">
                <Input
                  name="product_color"
                  disabled={!isEditable}
                  size="xs"
                  defaultValue={'Black'}
                />
              </Field>
              <Field label="category">
                <SearchSelection disabled={!isEditable} />
              </Field>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="solid" colorPalette={'red'} size={'xs'}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              onClick={() => setIsEditable(!isEditable)}
              size={'xs'}
              colorPalette={isEditable ? 'green' : 'blue'}
            >
              {isEditable ? 'Save' : 'Edit'}
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default ProductCard
