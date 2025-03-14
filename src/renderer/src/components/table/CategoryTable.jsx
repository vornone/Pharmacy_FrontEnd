'use client'

import { Button, Kbd, Table, Box, Group, Text, Stack } from '@chakra-ui/react'
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

import EditCategoryDialog from '@/renderer/src/components/dialog/category/EditCategoryDialog'
import AddCategoryDialog from '@/renderer/src/components/dialog/category/AddCategoryDialog'
import useUserRole from '@/renderer/src/hooks/useUserRole'

import LoadingScreen from '../loadingscreen/LoadingScreen'
import useInsertData from '@/renderer/src/hooks/useInsertData'
import useUpdateData from '@/renderer/src/hooks/useUpdateData'
import useDeleteData from '@/renderer/src/hooks/useDeleteData'
import { Popover, Portal } from "@chakra-ui/react"
import DeletePopover from '@/renderer/src/components/popover/DeletePopover'
import useCategory from '../../hooks/useCategory'
// Memoized TableRow component
const TableRow = memo(({ item, index, isSelected, onSelect, onUpdate, onDelete }) => {
  const handleSelect = useCallback((changes) => {
    onSelect(item.name, changes.checked);
  }, [item.name, onSelect]);

  return (
    <Table.Row data-selected={isSelected ? '' : undefined}>

      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell fontWeight={600} color={'black'} _dark={{ color: 'white' }} width="33%" wordBreak={'break-word'} >{item.categoryName}</Table.Cell>
      <Table.Cell >
        <EditCategoryDialog data={item} handleUpdateCategory={onUpdate}>
          <IconButton aria-label="Edit" size="sm" variant="ghost" colorPalette="blue">
            <MdEditDocument />
          </IconButton>
        </EditCategoryDialog>
        <DeletePopover onDelete={onDelete} item={item} name={'category'}/>
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
const CategoryTable = () => {
  const [selection, setSelection] = useState([]);
  const { data: categoryData, loading: categoryLoading, error: categoryError, getCategory } = useCategory();
  const [pageSizeNumber, setPageSizeNumber] = useState({
    pageSize: 10, pageNumber: 1});
  const { insertData } = useInsertData();
  const { updateData } = useUpdateData();
  const { deleteData } = useDeleteData();
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;
  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return items;
    return items.filter(item =>
      item.roleName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [items, searchText]);

  useEffect(() => {
    getCategory(pageSizeNumber);
  }, []);

  useEffect(() => {
    if (categoryData) {
      setItems(categoryData)
    }
  }, [categoryData]);

  const handleAddCategory = useCallback(async (item) => {
    try {
      await insertData('api/CAT0021', item);
      await getCategory( pageSizeNumber);
    } catch (error) {
      console.error("Error adding Category:", error);
    }
  }, [insertData]);

  const handleUpdateCategory = useCallback(async (item) => {
    try {
      await updateData('api/CAT0031', item);
      setItems(prev =>
        prev.map(existingItem =>
          existingItem.categoryId === item.categoryId ? item : existingItem
        )
      );
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  }, [updateData]);

  const handleDelete = useCallback(async (item) => {
    try {
      await deleteData('api/CAT0041', item);
      setItems(prev => prev.filter(existingItem => existingItem.categoryId !== item.categoryId));
      if (selection.includes(item.categoryName)) {
        setSelection(prev => prev.filter(name => name !== item.categoryName));
      }
    } catch (error) {
      console.error("Error deleting Category:", error);
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

  if (categoryLoading && items.length === 0) {
    return <LoadingScreen />;
  }

  if (categoryError) {
    return <Text>Error loading user roles: {categoryError}</Text>;
  }

  return (
    <>
    <Stack w="100%" h="100%" gap={5}>
      <Flex w="full" justify="space-between" gap={5}>
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search Category"
            w="50%"
            size={'xs'}
            value={searchText}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <IconButton variant={'outline'} size={'xs'}>
          <LuSlidersHorizontal />
        </IconButton>
        <AddCategoryDialog handleAddCategory={handleAddCategory}>
          <ButtonGroup variant={'surface'} colorPalette={'green'} size={'xs'}>
            <Button>New Category</Button>
          </ButtonGroup>
        </AddCategoryDialog>
      </Flex>
      <Table.Root variant={'outline'} striped={false} size={'sm'} borderRadius={'md'} tableLayout={'fixed'}>
        <TableHeader
          headers={headers}
          hasSelection={indeterminate ? 'indeterminate' : selection.length > 0}
          allSelected={selection.length === items.length}
          onSelectAll={handleSelectAll}
        />
        <Table.Body fontSize="sm" color={'gray.500'}>
          {filteredItems.map((item, index) => (
            <TableRow
              key={item.categoryId || index}
              item={item}
              index={index}
              isSelected={selection.includes(item.name)}
              onSelect={handleSelectItem}
              onUpdate={handleUpdateCategory}
              onDelete={handleDelete}
            />
          ))}
        </Table.Body>
      </Table.Root>
      </Stack>
    </>
  );
};

// Constants
const headers = ['Id', 'Role'];

export default memo(CategoryTable);
