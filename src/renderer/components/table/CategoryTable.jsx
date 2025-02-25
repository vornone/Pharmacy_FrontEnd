'use client'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'

import { Button, Kbd, Table, IconButton } from '@chakra-ui/react'
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator
} from '@/components/ui/action-bar'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { ButtonGroup } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'
import AddCategoryDialog from '@/renderer/components/dialog/AddCategoryDialog'
const CategoryTable = () => {
  const [selection, setSelection] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length

  const sortedItems = [...items].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
    }
    return 0
  })

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Handle edit action
  const handleEdit = (item) => {
    console.log('Edit item:', item)
    // Add your edit logic here
  }

  // Handle delete action
  const handleDelete = (item) => {
    console.log('Delete item:', item)
    // Add your delete logic here
  }

  const rows = sortedItems.map((item) => (
    <Table.Row key={item.name} data-selected={selection.includes(item.name) ? '' : undefined}>
      <Table.Cell>
        <Checkbox
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : selection.filter((name) => name !== item.name)
            )
          }}
        />
      </Table.Cell>
      {headers.map((header) => (
        <Table.Cell key={header}>{item[header]}</Table.Cell>
      ))}
      {/* Add Edit and Delete buttons */}
      <Table.Cell>
        <IconButton
          aria-label="Edit"
          size="sm"
          variant="ghost"
          onClick={() => handleEdit(item)}
          colorPalette={'blue'}
        >
          <MdEditDocument />
        </IconButton>
        <IconButton
          aria-label="Delete"
          size="sm"
          variant="ghost"
          colorPalette="red"
          onClick={() => handleDelete(item)}
        >
          <MdDeleteForever />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <>
      <Flex w="full" justify="space-between" gap={5}>
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input placeholder="Search Role" w="50%" size={'xs'} />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <AddCategoryDialog>
          <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
            <Button>New Category</Button>
          </ButtonGroup>
        </AddCategoryDialog>
      </Flex>
      <Table.Root variant={'outline'} striped={false} size={'md'} borderRadius={'md'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader h="5">
              <Checkbox
                aria-label="Select all rows"
                checked={indeterminate ? 'indeterminate' : selection.length > 0}
                onCheckedChange={(changes) => {
                  setSelection(changes.checked ? items.map((item) => item.name) : [])
                }}
              />
            </Table.ColumnHeader>
            {headers.map((header) => (
              <Table.ColumnHeader key={header} onClick={() => requestSort(header)}>
                {header}
                {sortConfig.key === header && (
                  <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                )}
              </Table.ColumnHeader>
            ))}
            {/* Add a header for actions */}
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body fontSize="sm" color={'gray.500'}>
          {rows}
        </Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>{selection.length} selected</ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete <Kbd>⌫</Kbd>
          </Button>
          <Button variant="outline" size="sm">
            Share <Kbd>T</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}

const headers = ['id', 'Name']
const items = [
  { id: 1, Name: 'hello' },
  { id: 2, Name: 'world' },
  { id: 3, Name: 'foo' },
  { id: 4, Name: 'bar' }
]

export default CategoryTable
