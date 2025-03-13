'use client'

import { Button, Kbd, Table, Box, Group, Text } from '@chakra-ui/react'
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator
} from '@/components/ui/action-bar'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState, useCallback, useMemo, memo } from 'react'
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

// Memoized DeleteConfirmation component
const DeleteConfirmation = memo(({ onDelete, onCancel, item }) => {
  const handleDelete = useCallback(() => {
    onDelete(item);
  }, [onDelete, item]);

  return (
    <Popover.Root>
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
                <Button size="xs" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button size="xs" colorPalette="red" variant={"surface"} onClick={handleDelete}>
                  Delete Role
                </Button>
              </Group>
            </Popover.Footer>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
});

// Memoized TableRow component
const TableRow = memo(({ item, index, isSelected, onSelect, onUpdate, onDelete }) => {
  const handleSelect = useCallback((changes) => {
    onSelect(item.name, changes.checked);
  }, [item.name, onSelect]);

  return (
    <Table.Row data-selected={isSelected ? '' : undefined}>

      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell fontWeight={600} color={'black'} _dark={{ color: 'white' }} width="33%" wordBreak={'break-word'} >{item.roleName}</Table.Cell>
      <Table.Cell >
        <EditUserRoleDialog data={item} handleUpdateUserRole={onUpdate}>
          <IconButton aria-label="Edit" size="sm" variant="ghost" colorPalette="blue">
            <MdEditDocument />
          </IconButton>
        </EditUserRoleDialog>
        <DeleteConfirmation onDelete={onDelete} item={item} onCancel={() => {}} />
      </Table.Cell>
    </Table.Row>
  );
});

// Memoized header
const TableHeader = memo(({ headers, hasSelection, allSelected, onSelectAll }) => {
  const handleSelectAll = useCallback((changes) => {
    onSelectAll(changes.checked);
  }, [onSelectAll]);

  return (
    <Table.Header bg={'gray.100'} _dark={{ bg: 'gray.800' }}>
      <Table.Row>

        {headers.map((header) => (
          <Table.ColumnHeader key={header}>{header}</Table.ColumnHeader>
        ))}
        <Table.ColumnHeader>Actions</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  );
});

// Main component
const UserRoleTable = () => {
  const [selection, setSelection] = useState([]);
  const { data: userRoleData, loading: userRoleLoading, error: userRoleError, getUserRole } = useUserRole();
  const { insertData } = useInsertData();
  const { updateData } = useUpdateData();
  const { deleteData } = useDeleteData();
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Derived state
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return items;
    return items.filter(item =>
      item.roleName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [items, searchText]);

  // Initial data load
  useEffect(() => {
    getUserRole();
  }, []);

  // Update local state when API data changes
  useEffect(() => {
    if (userRoleData) {
      setItems(userRoleData);
    }
  }, [userRoleData]);

  // Memoized handlers for real-time updates
  const handleAddUserRole = useCallback(async (item) => {
    try {
      const response = await insertData('api/ROLE0021', item);
      // Add the new item to the local state immediately
      // If the API returns the created item with an ID, use that
      const newItem = response?.data || { ...item, roleId: Date.now() }; // Fallback ID if none provided
      setItems(prev => [...prev, newItem]);
      // No need to call getUserRole() here
    } catch (error) {
      console.error("Error adding user role:", error);
    }
  }, [insertData]);

  const handleUpdateUserRole = useCallback(async (item) => {
    try {
      await updateData('api/ROLE0031', item);
      // Update the item in local state immediately
      setItems(prev =>
        prev.map(existingItem =>
          existingItem.roleId === item.roleId ? item : existingItem
        )
      );
      // No need to call getUserRole() here
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }, [updateData]);

  const handleDelete = useCallback(async (item) => {
    try {
      await deleteData('api/ROLE0041', item);
      // Remove the item from local state immediately
      setItems(prev => prev.filter(existingItem => existingItem.roleId !== item.roleId));
      // Clear the item from selection if it was selected
      if (selection.includes(item.name)) {
        setSelection(prev => prev.filter(name => name !== item.name));
      }
      // No need to call getUserRole() here
    } catch (error) {
      console.error("Error deleting user role:", error);
    }
  }, [deleteData, selection]);

  const handleSelectItem = useCallback((name, isChecked) => {
    setSelection(prev =>
      isChecked
        ? [...prev, name]
        : prev.filter(itemName => itemName !== name)
    );
  }, []);

  const handleSelectAll = useCallback((isChecked) => {
    setSelection(isChecked ? filteredItems.map(item => item.name) : []);
  }, [filteredItems]);

  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  if (userRoleLoading && items.length === 0) {
    return <LoadingScreen />;
  }

  if (userRoleError) {
    return <Text>Error loading user roles: {userRoleError}</Text>;
  }

  return (
    <>
      <Flex w="full" justify="space-between" gap={5}>
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search Role"
            w="50%"
            size={'xs'}
            value={searchText}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <AddUserRoleDialog handleAddUserRole={handleAddUserRole}>
          <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
            <Button>New Role</Button>
          </ButtonGroup>
        </AddUserRoleDialog>
      </Flex>
      <Table.Root variant={'outline'} striped={false} size={'sm'} borderRadius={'md'} tableLayout={'fixed'} >
        <TableHeader
          headers={headers}
          hasSelection={indeterminate ? 'indeterminate' : selection.length > 0}
          allSelected={selection.length === items.length}
          onSelectAll={handleSelectAll}
        />
        <Table.Body fontSize="sm" color={'gray.500'}>
          {filteredItems.map((item, index) => (
            <TableRow
              key={item.roleId || index}
              item={item}
              index={index}
              isSelected={selection.includes(item.name)}
              onSelect={handleSelectItem}
              onUpdate={handleUpdateUserRole}
              onDelete={handleDelete}
            />
          ))}
        </Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>{selection.length} selected</ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Bulk delete functionality for selected items
              const selectedItems = items.filter(item => selection.includes(item.name));
              selectedItems.forEach(item => handleDelete(item));
            }}
          >
            Delete <Kbd>⌫</Kbd>
          </Button>
          <Button variant="outline" size="sm">
            Share <Kbd>T</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  );
};

// Constants
const headers = ['Id', 'Role'];

export default memo(UserRoleTable);
