'use client'

import { Button, Kbd, Table,Box,Group, Text } from '@chakra-ui/react'
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
import EditUserRoleDialog from '@/renderer/src/components/dialog/user_role/EditUserRoleDialog'
import AddUserRoleDialog from '../dialog/user_role/AddUserRoleDialog'
import useUserRole from '@/renderer/src/hooks/useUserRole'
import LoadingScreen from '../loadingscreen/LoadingScreen'
import useInsertData from '@/renderer/src/hooks/useInsertData'
import useUpdateData from '@/renderer/src/hooks/useUpdateData'
import useDeleteData from '@/renderer/src/hooks/useDeleteData'
import { Popover, Portal } from "@chakra-ui/react"
const UserRoleTable = () => {
  const [selection, setSelection] = useState([])
  const {data: userRoleData, loading: userRoleLoading, error: userRoleError, getUserRole} = useUserRole()
  const {  insertData } = useInsertData()
  const { updateData } = useUpdateData()
  const { deleteData } = useDeleteData()
  const [items, setItems] = useState([])
  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < items.length

  useEffect(() => {
    getUserRole()
    if (userRoleData) {
      setItems(userRoleData)
    }
  }, [])



  const handleAddUserRole = async (item) => {
    try {
      await insertData('api/ROLE0021', item)
      // Only update items if the insertion was successful
      setItems((prev) => [...prev, item])
      getUserRole()
    } catch (error) {
      console.error("Error adding user role:", error)
      // Handle error (show message, etc.)
    }
  }

  const handleUpdateUserRole = async (item) => {
    try {
      await updateData('api/ROLE0031', item);
      // Update the existing item in the list
      setItems((prev) =>
        prev.map((existingItem) =>
          existingItem.roleId === item.roleId ? item : existingItem
        )
      );
      getUserRole();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteData('api/ROLE0041', item);
      // Remove the deleted item from the list
      setItems((prev) => prev.filter((existingItem) => existingItem.roleId !== item.roleId));
      getUserRole();
    } catch (error) {
      console.error("Error deleting user role:", error);
    }
  };
  const rows = items.map((item, index) => (
    <Table.Row key={item.roleName + index} data-selected={selection.includes(item.name) ? '' : undefined}>
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
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell fontWeight={600} color={'black'} _dark={{ color: 'white' }}>{item.roleName}</Table.Cell>
      <Table.Cell>
        <EditUserRoleDialog  data={item} handleUpdateUserRole={handleUpdateUserRole}>
          <IconButton aria-label="Edit" size="sm" variant="ghost" colorPalette="blue">
            <MdEditDocument />
          </IconButton>
        </EditUserRoleDialog>
        <Popover.Root >
      <Popover.Trigger asChild>
      <IconButton
          aria-label="Delete"
          size="sm"
          variant="ghost"
          colorPalette="red"

        >
          <MdDeleteForever />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header fontSize="sm" fontWeight="semibold">Deletion Confirmation</Popover.Header>
            <Popover.Arrow />
            <Popover.Body color={'gray.400'}>
              Are you sure you want to delete this role?
            </Popover.Body>
            <Popover.Footer justifyContent={"flex-end"}>
              <Group>
                <Button size="xs" variant="outline">
                  Cancel
                </Button>
                <Button size="xs" colorPalette="red" variant={"surface"} onClick={() => handleDelete(item)}>Delete Role</Button>
              </Group>
            </Popover.Footer>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>

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
        <AddUserRoleDialog handleAddUserRole={handleAddUserRole}   >
          <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
            <Button>New Role</Button>
          </ButtonGroup>
        </AddUserRoleDialog>
      </Flex>
      <Table.Root variant={'outline'} striped={false} size={'sm'} borderRadius={'md'} >
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
const headers = ['Id', 'Role']
const items = [
  { user_role_id: 1, user_role_name: 'Admin' },
  { user_role_id: 2, user_role_name: 'User' },
  { user_role_id: 3, user_role_name: 'Cashier' }
]

export default UserRoleTable
