import { Box, Button, Card, Image, Input, SelectRoot, VStack, Textarea } from '@chakra-ui/react'
import {
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
import useUpdateData from '@/renderer/src/hooks/useUpdateData'

const EditCategoryDialog = ({ children, handleUpdateCategory, data }) => {
  const { loading } = useUpdateData()
  const [invalid, setInvalid] = useState(false)
  const [category, setCategory] = useState({
    categoryId: data.categoryId || '',
    categoryName: data.categoryName || '',
    description: data.description || ''
  })
  const [open, setOpen] = useState(false) // Controls dialog open state

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setCategory((prevCat) => ({
      ...prevCat,
      [name]: value
    }))
    setInvalid(false)
  }

  const handleSubmit = async () => {
    if (!category.categoryName) {
      setInvalid(true)
      return
    }
    try {
      await handleUpdateCategory(category) // Ensure async operation completes
      setOpen(false) // Close dialog after successful update
    } catch (error) {
      console.error("Error updating category:", error)
    }
  }

  return (
    <DialogRoot placement="center" trapFocus={false} modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack w="100%" h="100%" align="flex-start">
            <Field invalid={invalid} label="Category Name" errorText="This field is required">
              <Input name="categoryName" size="sm" value={category.categoryName} onChange={handleOnChange} />
            </Field>
            <Field label="Description (optional)">
              <Textarea name="description" size="sm" value={category.description} onChange={handleOnChange} />
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button variant="surface" colorPalette="red" size="xs" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="xs"
            variant="surface"
            colorPalette="green"
            onClick={handleSubmit}
            isLoading={loading} // Show loading state
            disabled={loading || invalid}
          >
            {loading ? 'Saving...' : 'Update Category'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default EditCategoryDialog
