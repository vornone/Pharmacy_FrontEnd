'use client'

import { Button, Kbd, Table } from '@chakra-ui/react'
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator
} from '@/components/ui/action-bar'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

const DataTable = () => {
  const [selection, setSelection] = useState([])
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length

  const rows = items.map((item) => (
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
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.category}</Table.Cell>
      <Table.Cell>${item.price}</Table.Cell>
      <Table.Cell>{date}</Table.Cell>
    </Table.Row>
  ))

  return (
    <>
      <Table.Root variant={'outline'} striped={false} h="50%" size={'sm'} borderRadius={'md'}>
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
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
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

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  {
    id: 2,
    name: 'Coffee Maker',
    category: 'Home Appliances',
    price: 49.99
  },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 }
]

export default DataTable
