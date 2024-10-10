import React, { useEffect, useState, useRef } from 'react'
import EditableCell from '../table-component/EditableCell.jsx'
import {
  TableContainer,
  Button,
  Icon,
  Text,
  HStack,
  Flex,
  ButtonGroup,
  useColorMode,
  Spinner
} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import { IconButton } from '@chakra-ui/react'
import { TbEdit, TbChevronDown, TbChevronUp, TbPlus, TbArrowsSort } from 'react-icons/tb'
import EditUserModal from '../EditUserModal.jsx'
import { useDisclosure } from '@chakra-ui/react'
import EditRowButton from '../table-component/EditRowButton.jsx'
import DeleteRowButton from '../table-component/DeleteRowButton.jsx'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import useUser from '../../hooks/useUser.js'



function UserTable({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(data)
  const { deleteUser } = useUser()
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 5})
  const handleOpenModal = (row) => {
    onOpen()
    setRowSelection(row.original)
  }
  const handleDeleteRow = async (row) => {
    try {
      deleteUser({ user_id: row.original.user_id }) // Call the delete API
      const updatedData = tableData.filter((item) => item.user_id !== row.original.user_id)
      setTableData(updatedData)
      const currentRowsOnPage = updatedData.slice(
        pagination.pageIndex * pagination.pageSize,
        pagination.pageIndex * pagination.pageSize + pagination.pageSize
      );
      if (currentRowsOnPage.length === 0 && pagination.pageIndex > 0) {
        setPagination((prev) => ({
          ...prev,
          pageIndex: prev.pageIndex - 1,
        }));
      }
    } catch (error) {
      console.error('Error deleting row:', error)
    }
  }
  const columns = [
    {
      header: 'N',
      cell: ({ row }) => <Text width={50}>{row.index + 1}</Text>
    },
    {
      accessorKey: 'username',
      header: 'Name',
      cell: EditableCell,
      enableSorting: true
    },
    {
      accessorKey: 'role_name',
      header: 'Role',
      cell: EditableCell
    },
    {
      header: 'Action',
      cell: ({ row }) =>
        row.length !== 0 ? (
          <Flex>
            <EditRowButton handleOpenModal={() => handleOpenModal(row)} />{' '}
            <DeleteRowButton handleDeleteRow={() => handleDeleteRow(row)} />
          </Flex>
        ) : (
          ''
        )
    }
  ]

  const table = useReactTable({
    data: tableData,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false,
    pageCount:Math.ceil(tableData.length / pagination.pageSize),
    state: {
      rowSelection,
      pagination
    },
    onPaginationChange: setPagination,
    enableRowSelection: ' true',
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setTableData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value
                }
              : row
          )
        )
    }
  })

  return (
    <>
      <EditUserModal isOpen={isOpen} onClose={onClose} data={rowSelection}></EditUserModal>
      <TableContainer borderRadius={10} border={'2px'} borderColor={'gray.600'}>
        <Table variant={'simple'} size={'lg'}>
          <Thead bgColor={useColorMode().colorMode === 'dark' ? 'gray.600' : 'green.50'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    borderColor={'gray.600'}
                    textColor={useColorMode().colorMode === 'dark' ? 'white' : 'gray.800'}
                    fontWeight={'bold'}
                    fontFamily={'jetbrains mono'}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <IconButton
                        cursor={'pointer'}
                        colorScheme="white"
                        icon={
                          header.column.getIsSorted() === 'asc' ? (
                            <TbChevronDown />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <TbChevronUp />
                          ) : (
                            <TbArrowsSort />
                          )
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        disabled
                        mx={3}
                        boxSize={4}
                        variant={'ghost'}
                      ></IconButton>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id} borderTop={'2px'} borderColor={'gray.600'}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} border={'0px'} borderColor={'gray.600'}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
          <IoIosArrowBack />
        </Button>
        <Button onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
          <IoIosArrowForward />
        </Button>
      </ButtonGroup>
    </>
  )
}
export default UserTable
