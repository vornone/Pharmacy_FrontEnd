import { Box, Button, Card, Flex, Icon, Image, Input, SelectRoot, VStack } from '@chakra-ui/react'
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
import { MdCancel, MdEdit, MdOutlineCancel, MdSave } from 'react-icons/md'
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
const EditProductDialog = ({ product,children }) => {
  const [isEditable, setIsEditable] = React.useState(false)
  const [imagePreview, setImagePreview] = useState(`http://localhost:8080/images/${product.productImage}`)
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
      alert('Please select an image file.')
    }
  }
      const countries = [
        "pant",
        "skirt",
        "jeans",
        "shirt",
        "t-shirt",
      ];
  return (
    <>
      <Input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleUploadFile}   accept="image/*"/>

      <DialogRoot placement={'center'} trapFocus={false}  closeOnInteractOutside={false} >
        <DialogTrigger asChild >
          {children}
        </DialogTrigger>
        <DialogContent borderRadius={25} _dark={{ bg: 'gray.900' }} >
          <DialogHeader>
            <DialogTitle>Product Detail</DialogTitle>
          </DialogHeader>
          <DialogBody >
            <VStack w={'100%'} h={'100%'} p={5} align={'flex-start'}>
              <Image src={imagePreview} w={'full'} h={'200px'} objectFit="cover" borderRadius={'md'}/>
              <Button onClick={handleUploadClick} size={'sm'} disabled={!isEditable} variant={'outline'}>
                <HiUpload /> Edit Image
              </Button>
              <Field label="Product name">
                <Input
                  name="product_name"
                  defaultValue={product.productName}
                  disabled={!isEditable}
                  size="sm"
                />
              </Field>

              <Field label="Product price">
                <Input
                  name="product_price"
                  defaultValue={100}
                  disabled={!isEditable}
                  size="sm"
                />
              </Field>
              <Field label="Product Color">
                <Input
                  name="product_color"
                  disabled={!isEditable}
                  size="sm"
                  value={product.productColor}
                />
              </Field>
              <Flex gap={5}>
              <Field label="Product Size">
                <SegmentedControl defaultValue={product.productSize} items={['XS', 'SM', 'M', 'L', 'XL']} size="sm" disabled={!isEditable}/>
              </Field>
              <Field label="Category">
                <SearchSelection collection={countries} disabled={!isEditable}/>
              </Field>
              </Flex>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" colorPalette={'red'} size={'xs'}>
              <Flex gap={2} justify={'center'} align={'center'}><Icon size={'xs'}><MdOutlineCancel/></Icon>Cancel</Flex>
              </Button>
            </DialogActionTrigger>
            <Button
              variant="surface"
              onClick={() => setIsEditable(!isEditable)}
              size={'xs'}
              colorPalette={isEditable ? 'green' : 'blue'}
            >
              {isEditable ? <Flex gap={2} justify={'center'} align={'center'} ><Icon size={'xs'}><MdSave/></Icon>Save</Flex> : <Flex gap={2} justify={'center'} align={'center'}><Icon size={'xs'}><MdEdit/></Icon>Edit</Flex>}
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default EditProductDialog
