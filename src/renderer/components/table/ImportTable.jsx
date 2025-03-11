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
import { ButtonGroup } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'
const ImportTable = () => {
  const [selection, setSelection] = useState([])
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length

  const rows = items.map((item, index ) => (
    <Table.Row key={'import' + index} data-selected={selection.includes(item.name) ? '' : undefined}>
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
      <Table.Cell>{item.import_id}</Table.Cell>
      <Table.Cell>{item.import_total_item}</Table.Cell>
      <Table.Cell>{item.import_total_qty}</Table.Cell>
      <Table.Cell>${item.import_subtotal_price}</Table.Cell>
      <Table.Cell>${item.import_total_oth_price}</Table.Cell>
      <Table.Cell fontWeight={600} color={'black'} _dark={{ color: 'white' }}>${item.import_total_price}</Table.Cell>
      <Table.Cell>{item.import_date}</Table.Cell>
      <Table.Cell>
        <IconButton
          aria-label="Edit"
          size="sm"
          variant="ghost"
          colorPalette="blue"
          onClick={() => handleEdit(item)}
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
          <Input placeholder="Search Import" w="50%" size={'xs'} />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
          <Button>New Import</Button>
        </ButtonGroup>
      </Flex>
      <Table.Root variant={'outline'} striped={false} size={'sm'} borderRadius={'md'}>
        <Table.Header bg={'gray.100'} _dark={{ bg: 'gray.800' } }>
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
const headers = ['Id', 'Item', 'Qty', 'Subtotal','Others', 'Total',  'Date']
const items = [
  {
    import_id: 1,
    import_total_item: 5,
    import_total_qty: 17,
    import_subtotal_price: 560,
    import_total_price: 700,
    import_total_oth_price: 10,
    import_date: '2022-01-01'
  },
  {
    import_id: 2,
    import_total_item: 15,
    import_total_qty: 21,
    import_subtotal_price: 210,
    import_total_price: 300,
    import_total_oth_price: 7,
    import_date: '2022-01-01'
  },
  {
    import_id: 3,
    import_total_item: 21,
    import_total_qty: 5,
    import_subtotal_price: 100,
    import_total_price: 150,
    import_total_oth_price: 11,
    import_date: '2022-01-01'
  },
  {
    import_id: 4,
    import_total_item: 10,
    import_total_qty: 7,
    import_subtotal_price: 500,
    import_total_price: 614,
    import_total_oth_price: 5,
    import_date: '2022-01-01'
  }
]

export default ImportTable
