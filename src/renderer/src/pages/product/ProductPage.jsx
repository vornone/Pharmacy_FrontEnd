import React from 'react'
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
import {
  Box,
  Grid,
  Card,
  CardBody,
  Image,
  Text,
  Button,
  Input,
  Select,
  useDisclosure
} from '@chakra-ui/react'
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$20',
    category: 'Electronics',
    unit: 'pcs',
    qty: 10,
    color: 'Red',
    image: 'https://via.placeholder.com/150'
  }
  // Add more products here
]
function ProductPage() {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const handleEditClick = (product) => {
    setSelectedProduct(product)
    onEditOpen()
  }

  const handleAddClick = () => {
    onAddOpen()
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? product.category === filterCategory : true)
    )
  })
  return (
    <Box p={4}>
      <Box mb={4}>
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          placeholder="Filter by category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          mt={2}
        >
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </Select>
      </Box>

      <Button onClick={handleAddClick} mb={4}>
        Add Product
      </Button>

      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {filteredProducts.map((product) => (
          <Card key={product.id} onClick={() => handleEditClick(product)} cursor="pointer">
            <CardBody>
              <Image src={product.image} alt={product.name} />
              <Text>{product.name}</Text>
              <Text>{product.price}</Text>
              <Text>{product.category}</Text>
              <Text>{product.unit}</Text>
              <Text>{product.qty}</Text>
              <Text>{product.color}</Text>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Edit Product Dialog */}
      <Dialog isOpen={isEditOpen} onClose={onEditClose}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>Edit Product</DialogHeader>
          <DialogCloseButton />
          <DialogBody>
            {selectedProduct && (
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input value={selectedProduct.name} />
                <FormLabel>Price</FormLabel>
                <Input value={selectedProduct.price} />
                <FormLabel>Category</FormLabel>
                <Input value={selectedProduct.category} />
                <FormLabel>Unit</FormLabel>
                <Input value={selectedProduct.unit} />
                <FormLabel>Quantity</FormLabel>
                <Input value={selectedProduct.qty} />
                <FormLabel>Color</FormLabel>
                <Input value={selectedProduct.color} />
              </FormControl>
            )}
          </DialogBody>
          <DialogFooter>
            <Button colorScheme="blue" mr={3} onClick={onEditClose}>
              Close
            </Button>
            <Button variant="ghost">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog isOpen={isAddOpen} onClose={onAddClose}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>Add Product</DialogHeader>
          <DialogCloseButton />
          <DialogBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Product Name" />
              <FormLabel>Price</FormLabel>
              <Input placeholder="Product Price" />
              <FormLabel>Category</FormLabel>
              <Input placeholder="Product Category" />
              <FormLabel>Unit</FormLabel>
              <Input placeholder="Product Unit" />
              <FormLabel>Quantity</FormLabel>
              <Input placeholder="Product Quantity" />
              <FormLabel>Color</FormLabel>
              <Input placeholder="Product Color" />
            </FormControl>
          </DialogBody>
          <DialogFooter>
            <Button colorScheme="blue" mr={3} onClick={onAddClose}>
              Close
            </Button>
            <Button variant="ghost">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ProductPage
