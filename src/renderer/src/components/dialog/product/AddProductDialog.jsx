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
import useProduct from '../../hooks/useProduct'
import { toast } from 'react-toastify'

const AddProductDialog = ({ children, onProductAdded }) => {
  const [imagePreview, setImagePreview] = useState(
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  )
  const [uploadedImage, setUploadedImage] = useState(null)
  const [size, setSize] = useState('XS')
  const [product, setProduct] = useState({
    categoryId: '',
    productName: '',
    productSize: '',
    productColor: '',
    productImage: 'XS',
    description: '',
    remark: ''
  })
  const inputRef = useRef(null)
  
  const { registerProduct, loading, error, data } = useProduct()
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
        productImage: file.name
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
      productSize: value
    }))
  }

  const formatProductData = () => {
    return {
      productName: product.productName,
      productPrice: parseFloat(product.product_price),
      productColor: product.productColor,
      productCategory: product.categoryId,
      productSize: product.productSize,
      productImage: product.productImage,
      description: product.description,
      remark: product.remark
    }
  }
  const handleSubmit = async () => {
    if (!uploadedImage) {
      toast.error('Please upload a product image')
      return
    }
    
    if (!product.productName || !product.product_price) {
      toast.error('Product name and price are required')
      return
    }

    try {
      await registerProduct(formatProductData(), uploadedImage)
      toast.success('Product added successfully')
      if (onProductAdded) {
        onProductAdded()
      }
      
      // Reset form
      setProduct({
        categoryId: '',
        productName: '',
        productSize: '',
        productColor: '',
        productImage: 'XS',
        description: '',
        remark: ''
      })
      setUploadedImage(null)
      setImagePreview('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')
    } catch (err) {
      toast.error('Failed to add product: ' + (error || 'Unknown error'))
    }
  }

  // Effect to handle errors from the hook
  React.useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`)
    }
  }, [error])

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
                <Input name="productName" size="xs" onChange={handleOnChange} value={product.productName} />
              </Field>
              <Field label="Product size">
                <SegmentedControl
                  name="productSize"
                  defaultValue="XS"
                  items={['XS', 'S', 'M', 'L', 'XL']}
                  size="xs"
                  onValueChange={(e) =>
                    setProduct((prevProduct) => ({ ...prevProduct, productSize: e.value }))
                  }
                />
              </Field>
              <Field label="Product price">
                <Input name="product_price" size="xs" onChange={handleOnChange} value={product.product_price} />
              </Field>
              <Field label="Product Color">
                <Input name="productColor" size="xs" onChange={handleOnChange} value={product.productColor} />
              </Field>
              <Field label="category">
                <SearchSelection
                  name="category"
                  collection={['Shoes', 'Clothing', 'Accessories']}
                  onChange={(selectedValue) => {
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      category: selectedValue
                    }))
                  }}
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
            <Button 
              size={'xs'} 
              colorPalette={'green'} 
              onClick={handleSubmit} 
              isLoading={loading}
              loadingText="Adding..."
            >
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