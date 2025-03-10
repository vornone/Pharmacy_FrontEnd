'use client'

import { Button, Kbd, Table } from '@chakra-ui/react'
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator
} from '@/components/ui/action-bar'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'
import { IconButton } from '@chakra-ui/react'
import { ButtonGroup } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'
import EditUserDialog from '../dialog/EditUserDialog'
import useUser from '@/renderer/src/hooks/useUser'
import useUserRole from '@/renderer/src/hooks/useUserRole'
import AddUserDialog from '../dialog/AddUserDialog'
import useUpdateData from '@/renderer/src/hooks/useUpdateData'
const headers = ['Id', 'Name', 'Role', 'First Name', 'Last Name', 'Contact']

const UserTable = () => {
  const { data: userData,  getUser } = useUser()
  const { data: userRoleData, getUserRole } = useUserRole()
  const { updateData } = useUpdateData()
  const [selection, setSelection] = useState([])
  const [items, setItems] = useState([])
  const [roleItems, setRoleItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await getUser() // Ensure getUser completes first
      await getUserRole() // Fetch roles after users are loaded
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (userData) {
      setItems(userData)
    }
  }, [userData])

  useEffect(() => {
    if (userRoleData) {
      setRoleItems(userRoleData)
    }
  }, [userRoleData])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length
  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateData("api/USR0031", updatedUser);
      
      // Wait for the new user data to load
      await getUser();
  
      // Ensure the state updates correctly
      setItems((prev) =>
        prev.map((existingItem) =>
          existingItem.username === updatedUser.username ? updatedUser : existingItem
        )
      );
  
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  

  const rows = items.map((item, index) => (
    <Table.Row key={index+item.username} data-selected={selection.includes(item.name) ? '' : undefined}>
      <Table.Cell>
        <Checkbox
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : prev.filter((name) => name !== item.name)
            )
          }}
        />
      </Table.Cell>
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell fontWeight={600} color={'black'} _dark={{ color: 'white' }}>{item.username}</Table.Cell>
      <Table.Cell>{item.roleName}</Table.Cell>
      <Table.Cell textTransform={'capitalize'}>{item.firstName}</Table.Cell>
      <Table.Cell textTransform={'capitalize'}>{item.lastName}</Table.Cell>
      <Table.Cell>{item.contact}</Table.Cell>
      <Table.Cell>
        <EditUserDialog title="Edit User" data={item} roleData={roleItems} onUpdate={handleUpdateUser}>
          <IconButton aria-label="Edit" size="sm" variant="ghost" colorPalette="blue">
            <MdEditDocument />
          </IconButton>
        </EditUserDialog>
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
          <Input placeholder="Search User" w="50%" size={'xs'} />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <AddUserDialog  roleData={roleItems}>
          <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
            <Button>New User</Button>
          </ButtonGroup>
        </AddUserDialog>
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

export default UserTable
