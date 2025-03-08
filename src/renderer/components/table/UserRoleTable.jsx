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
import EditUserRoleDialog from '@/renderer/components/dialog/EditUserRoleDialog'
import AddUserRoleDialog from '../dialog/AddUserRoleDialog'
import useUserRole from '@/renderer/src/hooks/useUserRole'
import LoadingScreen from '../loadingscreen/LoadingScreen'
import useInsertData from '@/renderer/src/hooks/useInsertData'
const UserRoleTable = ({ roleData }) => {
  const [selection, setSelection] = useState([])
  const {data: userRoleData, loading: userRoleLoading, error: userRoleError, getUserRole} = useUserRole()
  const { data: insertRoleData, loading: insertRoleLoading, error: insertRoleError, insertData } = useInsertData()
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
        <EditUserRoleDialog title="Edit Role" data={item.roleName}>
          <IconButton aria-label="Edit" size="sm" variant="ghost" colorPalette="blue">
            <MdEditDocument />
          </IconButton>
        </EditUserRoleDialog>
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
        <AddUserRoleDialog handleAddUserRole={handleAddUserRole}   >
          <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
            <Button>New Role</Button>
          </ButtonGroup>
        </AddUserRoleDialog>
      </Flex>
      <Table.Root variant={'outline'} striped={false} size={'sm'} borderRadius={'md'} >
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
          {userRoleLoading ? <Table.Cell><LoadingScreen isLoading={userRoleLoading}  error={userRoleError}/></Table.Cell> : rows}
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
