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

const UserRoleTable = () => {
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
          <Input placeholder="Search Role" w="50%" size={'xs'} />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
          <Button>New Role</Button>
        </ButtonGroup>
      </Flex>
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
const headers = ['id', 'Role']
const items = [
  { id: 1, Role: 'Admin' },
  { id: 2, Role: 'User' },
  { id: 3, Role: 'Cashier' }
]

export default UserRoleTable
