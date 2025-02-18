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
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'
import { IconButton } from '@chakra-ui/react'
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
      {headers.map((header) => (
        <Table.Cell key={header}>{item[header]}</Table.Cell>
      ))}
      <Table.Cell>
              <IconButton aria-label="Edit" size="sm" variant="ghost" onClick={() => handleEdit(item)}>
                <MdEditDocument />
              </IconButton>
              <IconButton
                aria-label="Delete"
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={() => handleDelete(item)}
              >
                <MdDeleteForever />
              </IconButton>
            </Table.Cell>
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
            {headers.map((header) => (
              <Table.ColumnHeader key={header}>{header}</Table.ColumnHeader>
            ))}
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
const headers = ['id', 'Item', 'Qty', 'Subtotal', 'Total', 'Others', 'Date', ]
const items = [
  { id: 1, Item: 5, Qty: 17, Subtotal: 560, Total: 700, Others: 10, Date: '2022-01-01' },
  { id: 2, Item: 15, Qty: 21, Subtotal: 210, Total: 300, Others: 7, Date: '2022-01-01' },
  { id: 3, Item: 21, Qty: 5, Subtotal: 100, Total: 150, Others: 11, Date: '2022-01-01' },
  { id: 4, Item: 10, Qty: 7, Subtotal: 500, Total: 614, Others: 5, Date: '2022-01-01' }
]

export default DataTable
