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
import React, { useRef, forwardRef, useState, useEffect } from 'react'
import { Field } from '@/components/ui/field'
import { HiUpload } from 'react-icons/hi'
import SearchSelection from '@/renderer/src/components/autocomplete/SearchSelection'
import { MdCancel, MdEdit, MdOutlineCancel, MdSave } from 'react-icons/md'
import useCategory from '@/renderer/src/hooks/useCategory'
const product_detail = [
  {
    productName: 'Nue Camp',
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
const AddProductDialog = ({ children, insertProduct }) => {
  const { data, loading, error, getCategory } = useCategory()
  const [isEditable, setIsEditable] = React.useState(false)
  const [imagePreview, setImagePreview] = useState('@/renderer/public/img/y9DpT.jpg')
  const [category, setCategory] = useState([])
  const [uploadedImage, setUploadedImage] = useState(null)
  const [product, setProduct] = useState({
    categoryId: 0,
    productName: '',
    productSize: '',
    productColor: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }))
  }
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
  const countries = ['pant', 'skirt', 'jeans', 'shirt', 't-shirt']

  useEffect(() => {
    getCategory({ pageSize: 10, pageNumber: 1 })
    if (data) {
      setCategory(data.map((item) => item.categoryName))
    }
  }, [])

  return (
    <>
      <Input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleUploadFile}
        accept="image/*"
      />

      <DialogRoot placement={'center'} trapFocus={false} closeOnInteractOutside={false}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent borderRadius={25} _dark={{ bg: 'gray.900' }}>
          <DialogHeader>
            <DialogTitle>Product Detail</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack w={'100%'} h={'100%'} p={5} align={'flex-start'}>
              <Image
                src={imagePreview}
                w={'full'}
                h={'200px'}
                objectFit="cover"
                borderRadius={'md'}
              />
              <Button onClick={handleUploadClick} size={'sm'} variant={'outline'}>
                <HiUpload /> Edit Image
              </Button>
              <Field label="Product name">
                <Input name="productName" size="sm" onChange={handleChange} />
              </Field>

              <Field label="Product price">
                <Input name="product_price"  size="sm" />
              </Field>
              <Field label="Product Color">
                <Input name="productColor" onChange={handleChange} size="sm" />
              </Field>
              <Flex gap={5}>
                <Field label="Product Size">
                  <SegmentedControl
                    name="productSize"
                    onChange={handleChange}
                    items={['XS', 'SM', 'M', 'L', 'XL']}
                    size="sm"
                  />
                </Field>
                <Field label="Category">
                  <SearchSelection
                    collection={category}
                    onChange={(value) => setProduct({ ...product, categoryId: value })}
                  />
                </Field>
              </Flex>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" colorPalette={'red'} size={'xs'}>
                <Flex gap={2} justify={'center'} align={'center'}>
                  <Icon size={'xs'}>
                    <MdOutlineCancel />
                  </Icon>
                  Cancel
                </Flex>
              </Button>
            </DialogActionTrigger>
            <Button
              variant="surface"
              onClick={() => setIsEditable(!isEditable)}
              size={'xs'}
              colorPalette={'green'}
            >
              <Flex gap={2} justify={'center'} align={'center'}>
                <Icon size={'xs'}>
                  <MdSave />
                </Icon>
                Add Product
              </Flex>
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default AddProductDialog
