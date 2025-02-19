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
import { Badge } from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'

const SaleTable = () => {
  const [selection, setSelection] = useState([])
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length
  const handleEdit = (item) => {
    console.log(item)
  }
  const handleShowDetails = (item) => {
    console.log(item)
  }
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
      <Table.Cell>{item.id}</Table.Cell>
      <Table.Cell>{item.customer}</Table.Cell>
      <Table.Cell>${item.Subtotal}</Table.Cell>
      <Table.Cell>${item.Total}</Table.Cell>
      <Table.Cell>${item.Remaining}</Table.Cell>
      <Table.Cell>{item.Date}</Table.Cell>
      <Table.Cell>
        {item.Remaining === 0 ? (
          <Badge colorPalette="green">success</Badge>
        ) : (
          <Badge colorPalette="yellow">pending</Badge>
        )}
      </Table.Cell>
      <Table.Cell>
        <IconButton
          aria-label="Edit"
          size="sm"
          variant="ghost"
          onClick={() => handleShowDetails(item)}
        >
          <MdEditDocument />
        </IconButton>
        <IconButton
          aria-label="edit"
          size="sm"
          variant="ghost"
          colorPalette="blue"
          onClick={() => handleEdit(item)}
        >
          <HiDotsVertical />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <>
      <Table.Root variant={'outline'} striped={false} size={'sm'} borderRadius={'md'}>
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
const headers = ['id', 'Customer', 'Subtotal', 'Total', 'Remaining', 'Date', 'Status']
const items = [
  {
    id: 1,
    customer: 'John Doe',
    subtotal: 500,
    Total: 700,
    Others: 10,
    Remaining: 500,
    Date: '2022-01-01'
  },
  {
    id: 2,
    customer: 'Sokly',
    subtotal: 300,
    Total: 310,
    Others: 10,
    Remaining: 500,
    Date: '2022-01-01'
  },
  {
    id: 3,
    customer: 'Rath',
    subtotal: 500,
    Total: 600,
    Others: 10,
    Remaining: 0,
    Date: '2022-01-01'
  }
]

export default SaleTable
