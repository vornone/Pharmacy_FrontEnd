import React, { useEffect, useState, useCallback, useMemo } from 'react'
import {
  TableContainer,
  Button,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  ButtonGroup,
  useToast,
  useColorMode
} from '@chakra-ui/react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { TbChevronDown, TbChevronUp, TbArrowsSort } from 'react-icons/tb'
import { useDisclosure } from '@chakra-ui/react'
import EditRowButton from '../table-component/EditRowButton.jsx'
import DeleteRowButton from '../table-component/DeleteRowButton.jsx'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import EditImportProductRow from '../modal/EditImportProductRow.jsx'
function ImportProductTable({ importData, deleteRow, updateRow }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(importData)
  const [columnFilters, setColumnFilters] = useState([])
  const toast = useToast()

  // Update local table data when importData changes

  // Handle row deletion with immediate UI update
  const handleDeleteRow = useCallback(
    (row) => {
      try {
        // Call parent delete handler
        deleteRow(row)

        // Update local table data immediately
        setTableData((prev) =>
          prev.filter((item) => {
            if (!row.original.product_name) return true
            return (
              item.product_name !== row.original.product_name ||
              item.import_price !== row.original.import_price ||
              item.import_quantity !== row.original.import_quantity ||
              item.shipping_price !== row.original.shipping_price
            )
          })
        )
      } catch (error) {
        console.error('Error deleting row:', error)
        toast({
          title: 'Error',
          description: 'Failed to delete row',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    },
    [deleteRow, toast]
  )

  const handleOpenModal = (row) => {
    onOpen()
    setRowSelection(row.original)
  }

  // Memoized columns definition
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            isChecked={table.getIsAllRowsSelected()}
            isIndeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            borderColor={useColorMode().colorMode === 'light' ? 'black' : 'white'}
          />
        ),
        cell: ({ row }) =>
          row.getValue('product_name') && (
            <Checkbox
              isChecked={row.getIsSelected()}
              isIndeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
              borderColor={'gray.600'}
            />
          ),
        enableSorting: false,
        size: 'sm',
        width: '50px'
      },
      {
        accessorKey: 'product_name',
        header: 'name',
        cell: ({ getValue }) => <Text>{getValue()}</Text>,
        enableSorting: false
      },
      {
        accessorKey: 'import_quantity',
        header: 'Qty',
        cell: ({ getValue }) => <Text>{getValue()}</Text>
      },
      {
        accessorKey: 'import_price',
        header: 'import',
        cell: ({ getValue }) => {
          const value = getValue()
          return value && <Text>${value}</Text>
        },
        enableColumnFilter: true
      },
      {
        accessorKey: 'shipping_price',
        header: 'Shipping',
        cell: ({ getValue }) => {
          const value = getValue()
          return value && <Text>${value}</Text>
        }
      },
      {
        accessorKey: 'total_price',
        header: 'total',
        cell: ({ getValue }) => {
          const value = getValue()
          return value && <Text>${value}</Text>
        }
      },
      {
        header: 'Action',
        cell: ({ row }) =>
          !row.getValue('product_name') ? (
            <Flex height={'35px'}></Flex>
          ) : (
            <Flex>
              <EditRowButton handleOpenModal={() => handleOpenModal(row)} />
              <DeleteRowButton handleDeleteRow={() => handleDeleteRow(row)} />
            </Flex>
          )
      }
    ],
    [handleDeleteRow]
  )

  const table = useReactTable({
    data: importData,
    columns,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      columnFilters
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    enableRowSelection: true
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxH={'max-content'} maxW={'max-content'} minW={'lg'}>
          <ModalHeader>Edit Import</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditImportProductRow rowData={rowSelection} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <TableContainer borderRadius={10} border={'2px'} borderColor={'gray.600'} width={'100%'}>
        <Table variant="simple">
          <Thead bgColor={useColorMode().colorMode === 'dark' ? 'gray.600' : 'green.50'}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    borderColor={'gray.600'}
                    textColor={useColorMode().colorMode === 'dark' ? 'white' : 'gray.800'}
                    fontWeight={'bold'}
                    fontFamily={'Inter'}
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
                        mx={3}
                        boxSize={4}
                        variant={'ghost'}
                      />
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

export default ImportProductTable
