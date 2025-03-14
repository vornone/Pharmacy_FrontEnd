import { Box, Button, Card, Image, Input, SelectRoot, VStack, Textarea } from '@chakra-ui/react'
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
import React, { useState } from 'react'
import { Field } from '@/components/ui/field'
import  useInsertData  from '@/renderer/src/hooks/useInsertData'

const AddCategoryDialog = ({ children ,handleAddCategory}) => {
  const { data, loading, error, insertData } = useInsertData()
  const [invalid, setInvalid] = useState(false)
  const [category, setCategory] = useState({
    categoryName: '',
    description: ''
  })


  const handleOnChange = (e) => {
    const { name, value } = e.target
    setCategory((prevcategory) => ({
      ...prevcategory,
      [name]: value
    }))
    setInvalid(false)
  }

  const handleSubmit = () => {
    if (!category.categoryName || !category.description) {
      setInvalid(true)
      return
    }
    handleAddCategory(category)
    setCategory({
      categoryName: '',
      description: ''
    })
    setInvalid(false)
  }

  return (
    <DialogRoot placement="center" trapFocus={false} modal={true}  unmountOnExit>
      <DialogTrigger asChild >{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w="100%" h="100%" align="flex-start">
            <Field  invalid={invalid} label="category Name" errorText="This field is invalid">
              <Input

                name="categoryName"
                size="sm"
                value={category.categoryName}
                onChange={handleOnChange}
              />
            </Field>
            <Field  label="Description (optional)" >
              <Textarea
                name="description"
                size="sm"
                value={category.description}
                onChange={handleOnChange}
              />
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="surface" colorPalette="red" size="xs">
              Cancel
            </Button>
          </DialogActionTrigger >
          <Button
            size="xs"
            variant="surface"
            colorPalette="green"
            onClick={() => handleSubmit()}
            isLoading={loading} // Better UX for loading state
            disabled={loading || invalid}
          >
            {loading ? 'Saving...' : 'Add category'}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger  />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddCategoryDialog
