'use client'

import { Button, IconButton, ButtonGroup, Flex, Input, HStack, Stack, Table } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'
import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import useUserRole from '@/renderer/src/hooks/useUserRole'
import useUpdateData from '@/renderer/src/hooks/useUpdateData'
import useDeleteData from '@/renderer/src/hooks/useDeleteData'
import useInsertData from '@/renderer/src/hooks/useInsertData'
import DeletePopover from '@/renderer/src/components/popover/DeletePopover'
import { Skeleton } from "@/components/ui/skeleton"
import EditUserRoleDialog from '@/renderer/src/components/dialog/user_role/EditUserRoleDialog'
import AddUserRoleDialog from '../dialog/user_role/AddUserRoleDialog'
const headers = ['Id', 'Role', 'Description',]

const UserRoleTable = () => {
  const { data: userRoleData, loading: roleLoading, getUserRole } = useUserRole()
  const { loading: deleteLoading, deleteData } = useDeleteData()
  const { insertData } = useInsertData()
  const { updateData } = useUpdateData()

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dataInitialized = useRef(false)

  // Fetch Data Once
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([getUserRole()])
      } catch (error) {
        console.error("Error fetching initial data:", error)
      }
    }
    
    if (!dataInitialized.current) {
      fetchData()
      dataInitialized.current = true
    }
  }, [ getUserRole])

  // Update local state only when API data is available and stable
  useEffect(() => {
    if (userRoleData) {
      setItems(userRoleData)
    }
  }, [userRoleData])

  // Update loading state based on API loading states
  useEffect(() => {
    setIsLoading(roleLoading)
  }, [roleLoading])

  const handleUpdate = useCallback(async (updatedRole) => {
    try {
      await updateData("api/ROLE0031", updatedRole);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.roleId === updatedRole.roleId ? updatedRole : item
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }, [updateData, getUserRole]);

  const handleInsert = useCallback(async (item) => {
    setIsLoading(true)
    try {
      if (!item.roleName) throw new Error("Role are required")
      await insertData('api/ROLE0021', item)
      await getUserRole()
    } catch (error) {
      console.error("Error adding role:", error)
    } finally {
      setIsLoading(false)
    }
  }, [insertData, getUserRole])

  const handleDelete = useCallback(async (item) => {
    setIsLoading(true)
    try {
      await deleteData('api/ROLE0041', item)
      setItems((prevItems) => prevItems.filter((x) => x.roleId !== item.roleId))
    } catch (error) {
      console.error("Error deleting role:", error)
    } finally {
      setIsLoading(false)
    }
  }, [deleteData, getUserRole])

  const rows = useMemo(() => {
    if (isLoading || !items.length) {
      return Array(3).fill(0).map((_, index) => (
        <Table.Row key={`skeleton-${index}`}>
          {Array(4).fill(0).map((_, cellIndex) => (
            <Table.Cell key={`skeleton-cell-${cellIndex}`}>
              <Skeleton height="20px" width={cellIndex === 6 ? "70px" : "100%"} />
            </Table.Cell>
          ))}
        </Table.Row>
      ));
    }
    
    return items.map((item, index) => (
      <Table.Row key={item.roleName }>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell color={'black'} _dark={{ color: 'white' }}>{item.roleName}</Table.Cell>
        <Table.Cell textTransform={'capitalize'}>{item.roleDescription}</Table.Cell>
        <Table.Cell>
          <EditUserRoleDialog data={item} handleUpdateUserRole={handleUpdate}>
            <IconButton aria-label="Edit" size="sm" variant="ghost" colorPalette="blue">
              <MdEditDocument />
            </IconButton>
          </EditUserRoleDialog>
          <DeletePopover onDelete={() => handleDelete(item)} isLoading={deleteLoading} name="User" />
        </Table.Cell>
      </Table.Row>
    ));
  }, [items, handleDelete, handleUpdate, deleteLoading, isLoading]);

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
        <AddUserRoleDialog handleAddUserRole={handleInsert}>
          <ButtonGroup variant="surface" colorPalette="green" size="xs">
            <Button>New User</Button>
          </ButtonGroup>
        </AddUserRoleDialog>
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

export default UserRoleTable