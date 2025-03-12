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
import SearchSelection from '@/renderer/src/components/autocomplete/SearchSelection'

const AddProductDialog = ({ children }) => {
  const [imagePreview, setImagePreview] = useState(
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  )
  const [uploadedImage, setUploadedImage] = useState(null)
  const [size, setSize] = useState('XS')
  const [product, setProduct] = useState({
    product_name: '',
    product_price: '',
    product_color: '',
    category: '',
    product_size: size, // Default size
    product_image: ''
  })
  const inputRef = useRef(null)

  const handleUploadClick = () => {
    inputRef.current.click()
  }

  const handleUploadFile = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file)
      setImagePreview(URL.createObjectURL(file))
      setProduct((prevProduct) => ({
        ...prevProduct,
        product_image: URL.createObjectURL(file)
      }))
    } else {
      toast.error('Please select an image file.')
    }
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }))
  }

  const handleSizeChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      product_size: value
    }))
  }

  const handleSubmit = () => {
    console.log(product)
  }

  return (
    <>
      <Input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleUploadFile} />
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Detail</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack w={'100%'} h={'100%'} p={5} align={'flex-start'}>
              <Image src={imagePreview} w={'150px'} h={'150px'} objectFit="cover" />
              <Button onClick={handleUploadClick} size={'xs'}>
                <HiUpload /> Edit Image
              </Button>
              <Field label="Product name">
                <Input name="product_name" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="Product size">
                <SegmentedControl
                  name="product_size"
                  defaultValue="XS"
                  items={['XS', 'S', 'M', 'L', 'XL']}
                  size="xs"
                  onValueChange={(e) =>
                    setProduct((prevProduct) => ({ ...prevProduct, product_size: e.value }))
                  }
                />
              </Field>
              <Field label="Product price">
                <Input name="product_price" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="Product Color">
                <Input name="product_color" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="category">
                <SearchSelection
                  collection={['Shoes', 'Clothing', 'Accessories']}
                  onChange={handleOnChange}
                />
              </Field>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="solid" colorPalette={'red'} size={'xs'}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button size={'xs'} colorPalette={'green'} onClick={handleSubmit}>
              Add Product
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default AddProductDialog
