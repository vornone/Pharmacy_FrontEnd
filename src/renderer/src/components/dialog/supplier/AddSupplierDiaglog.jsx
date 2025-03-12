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

const AddSupplierDiaglog = ({ children }) => {
  const [supplier, setSupplier] = useState({
    supplier_name: '',
    supplier_address: '',
    supplier_contact1: '',
    supplier_contact2: ''
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log(supplier)
  }

  return (
    <>
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack w={'100%'} h={'100%'} align={'flex-start'}>
              <Field label="Supplier Name">
                <Input name="supplier_name" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="Supplier Address">
                <Input name="supplier_address" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="Supplier Contact 1">
                <Input name="supplier_contact1" size="xs" onChange={handleOnChange} />
              </Field>
              <Field label="Supplier Contact 2">
                <Input name="supplier_contact2" size="xs" onChange={handleOnChange} />
              </Field>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="solid" colorPalette={'red'} size={'xs'}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button size={'xs'} variant={'solid'} colorPalette={'green'} onClick={handleSubmit}>
              Add New Supplier
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default AddSupplierDiaglog
