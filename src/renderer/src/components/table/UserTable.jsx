'use client'

import { Button, IconButton, ButtonGroup, Flex, Input, HStack, Stack, Table } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'
import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import useUser from '@/renderer/src/hooks/useUser'
import useUserRole from '@/renderer/src/hooks/useUserRole'
import useUpdateData from '@/renderer/src/hooks/useUpdateData'
import useDeleteData from '@/renderer/src/hooks/useDeleteData'
import useInsertData from '@/renderer/src/hooks/useInsertData'
import EditUserDialog from '@/renderer/src/components/dialog/user/EditUserDialog'
import AddUserDialog from '@/renderer/src/components/dialog/user/AddUserDialog'
import DeletePopover from '@/renderer/src/components/popover/DeletePopover'
import { Skeleton } from "@/components/ui/skeleton"

const headers = ['Id', 'Name', 'Role', 'First Name', 'Last Name', 'Contact']

const UserTable = () => {
  const { data: userData, loading: userLoading, error: userError, getUser } = useUser()
  const { data: userRoleData, getUserRole } = useUserRole()
  const { loading: deleteLoading,deleteData } = useDeleteData()
  const { insertData } = useInsertData()
  const { updateData } = useUpdateData()

  const [items, setItems] = useState([])
  const [roleItems, setRoleItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const selectionRef = useRef(new Set()) // Use ref to avoid re-renders

  // Fetch Data Once
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getUser(), getUserRole()])
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (userData) setItems(userData)
    if (userRoleData) setRoleItems(userRoleData)
  }, [userData, userRoleData])

  const handleUpdateUser = useCallback(async (updatedUser) => {
    try {
      await updateData("api/USR0031", updatedUser);
  
      // Update the local state instead of refetching the whole list
      setItems(prevItems =>
        prevItems.map(user =>
          user.username === updatedUser.username ? { ...user, ...updatedUser } : user
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }, [updateData]);
  

  const handleAddUser = useCallback(async (item) => {
    setIsLoading(true)
    try {
      if (!item.username || !item.roleId) throw new Error("Username and Role are required")
      await insertData('auth/', item)
      await getUser()
    } catch (error) {
      console.error("Error adding user:", error)
    } finally {
      setIsLoading(false)
    }
  }, [insertData, getUser])

  const handleDelete = useCallback(async (item) => {
    setIsLoading(true)
    try {
      await deleteData('api/USR0041', item)
      await getUser()
    } catch (error) {
      console.error("Error deleting user:", error)
    } finally {
      setIsLoading(false)
    }
  }, [deleteData, getUser])

  const rows = useMemo(() => (
    items.map((item, index) => (
      <Table.Row key={item.username}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell fontWeight={600} color={'black'} _dark={{ color: 'white' }}>{item.username}</Table.Cell>
        <Table.Cell>{item.roleName}</Table.Cell>
        <Table.Cell textTransform={'capitalize'}>{item.firstName}</Table.Cell>
        <Table.Cell textTransform={'capitalize'}>{item.lastName}</Table.Cell>
        <Table.Cell>{item.contact}</Table.Cell>
        <Table.Cell>
          <EditUserDialog  data={item} roleData={roleItems} onUpdate={handleUpdateUser}>
            <IconButton aria-label="Edit" size="sm" variant="ghost" colorPalette="blue">
              <MdEditDocument />
            </IconButton>
          </EditUserDialog>
          <DeletePopover onDelete={() => handleDelete(item)} isLoading={deleteLoading} name="User" />
        </Table.Cell>
      </Table.Row>
    ))
  ), [items, handleDelete, handleUpdateUser, roleItems, isLoading])

  return (
    <Stack w="100%" h="100%" gap={5}>
      <Flex w="full" justify="space-between" gap={5}>
        <HStack flex="1">
          <IconButton variant="outline" size="xs">
            <LuSearch />
          </IconButton>
          <Input placeholder="Search User" w="50%" size="xs" />
        </HStack>
        <IconButton variant="outline" size="xs">
          <LuSlidersHorizontal />
        </IconButton>
        <AddUserDialog roleData={roleItems} onInsert={handleAddUser}>
          <ButtonGroup variant="surface" colorPalette="green" size="xs">
            <Button>New User</Button>
          </ButtonGroup>
        </AddUserDialog>
      </Flex>


        <Table.Root variant="outline" striped={false} size="sm" borderRadius="md" tableLayout="fixed">
          <Table.Header bg="gray.100" _dark={{ bg: 'gray.800' }}>
            <Table.Row>
              {headers.map(header => <Table.ColumnHeader key={header}>{header}</Table.ColumnHeader>)}
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body fontSize="sm" color="gray.500">
            {rows}
          </Table.Body>
        </Table.Root>

    </Stack>
  )
}

export default UserTable
