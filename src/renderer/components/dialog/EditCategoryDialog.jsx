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
import React, { useRef, forwardRef, useState, useEffect } from 'react'
import { Field } from '@/components/ui/field'
import { HiUpload } from 'react-icons/hi'
import SearchSelection from '@/renderer/components/autocomplete/SearchSelection'

const EditCategoryDialog = ({ children, title, data }) => {
  const [category, setCategory] = useState({
    category_name: data
  })

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    console.log(role)
  }

  useEffect(() => {
    console.log(category)
  }, [category])

  return (
    <>
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack w={'100%'} h={'100%'} align={'flex-start'}>
              <Field label="Category Name">
                <Input
                  name="category_name"
                  value={category.category_name}
                  size="xs"
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
            <Button size={'xs'} variant={'solid'} colorPalette={'green'} onClick={handleSubmit}>
              Submit
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default EditCategoryDialog
