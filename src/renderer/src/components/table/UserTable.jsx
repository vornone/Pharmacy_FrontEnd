'use client'

import { Button, Kbd, Spinner, Table } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
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


  useEffect(() => {
    const fetchData = async () => {
      await getUser()
      await getUserRole()
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
      setItems((prev) =>
        prev.map((existingItem) =>
          existingItem.username === updatedUser.username ? updatedUser : existingItem
        )
      );

    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAddUser = async (item) => {
    setIsLoading(true);
    try {
      // Optional: Add validation here
      if (!item.username || !item.roleId) {
        throw new Error("Username and Role are required");
      }
      setItems((prev) => [...prev, { ...item, id: prev.length + 1 }]);
      await insertData('auth/', item);
      console.log("User added successfully");
    } catch (error) {
      setItems((prev) => prev.filter((user) => user.username !== item.username));
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item) => {
    setIsLoading(true);
    try {
      await deleteData('api/USR0041', item);
      setItems((prev) => prev.filter((existingItem) => existingItem.username !== item.username));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const rows = items.map((item, index) => (
    <Table.Row key={index+item.username} data-selected={selection.includes(item.name) ? '' : undefined}>
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

  return (
    <>
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
      { userLoading?     <Stack gap="6" w={'full'}>
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack> :
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
      }
    </>
  )
}

export default UserTable
