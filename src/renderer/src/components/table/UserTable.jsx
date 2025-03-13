'use client'

import { Button, Kbd, Spinner, Table } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'
import { use, useEffect, useState } from 'react'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'
import { IconButton } from '@chakra-ui/react'
import { ButtonGroup } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Input , HStack, Stack } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'
import EditUserDialog from '@/renderer/src/components/dialog/user/EditUserDialog'
import useUser from '@/renderer/src/hooks/useUser'
import useUserRole from '@/renderer/src/hooks/useUserRole'
import AddUserDialog from '@/renderer/src/components/dialog/user/AddUserDialog'
import useUpdateData from '@/renderer/src/hooks/useUpdateData'
import useDeleteData from '@/renderer/src/hooks/useDeleteData'
import useInsertData from '@/renderer/src/hooks/useInsertData'
import DeletePopover from '@/renderer/src/components/popover/DeletePopover'
import { useCallback } from 'react'
import { useMemo } from 'react'
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@/components/ui/skeleton"

const headers = ['Id', 'Name', 'Role', 'First Name', 'Last Name', 'Contact']
const UserTable = () => {
  const { data: userData, loading: userLoading, error: userError, getUser } = useUser()
  const { data: userRoleData, getUserRole } = useUserRole()
  const { deleteData } = useDeleteData()
  const { insertData } = useInsertData()
  const { updateData } = useUpdateData()
  const [selection, setSelection] = useState([])
  const [items, setItems] = useState([])
  const [roleItems, setRoleItems] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  const fetchData = useCallback(async () => {
    await getUser();
    await getUserRole();
  }, [getUser, getUserRole]);

  useEffect(() => {
    fetchData().then(() => {
      if (userData) setItems(userData);
      if (userRoleData) setRoleItems(userRoleData);
    });
  }, [userData]);


  const hasSelection = selection.length > 0
  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateData("api/USR0031", updatedUser);
      await getUser();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAddUser = async (item) => {
    setIsLoading(true);
    try {
      if (!item.username || !item.roleId) {
        throw new Error("Username and Role are required");
      }
      await insertData('auth/', item);
      await getUser();
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item) => {
    setIsLoading(true);
    try {
      await deleteData('api/USR0041', item);
      await getUser();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const rows = useMemo(() =>
    items.map((item, index) => (
      <Table.Row key={index + item.username} data-selected={selection.includes(item.name) ? '' : undefined}>
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
          <DeletePopover onDelete={() => handleDelete(item)} isLoading={isLoading} name="User" />
        </Table.Cell>
      </Table.Row>
    ))
  , [items, selection, isLoading]);


  return (
    <>
    <Stack w={'100%'} h={'100%'}  gap={5}>
      <Flex w="full" justify="space-between" gap={5}>
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input placeholder="Search User" w="50%" size={'xs'} />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <AddUserDialog  roleData={roleItems} onInsert={handleAddUser} >
          <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
            <Button>New User</Button>
          </ButtonGroup>
        </AddUserDialog>
      </Flex>

      <Table.Root variant={'outline'} striped={false} size={'sm'} borderRadius={'md'}>
        <Table.Header bg={'gray.100'} _dark={{ bg: 'gray.800' } }>
          <Table.Row>
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
    </Stack>
    </>
  )
}

export default UserTable
