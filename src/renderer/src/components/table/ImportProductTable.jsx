import React, { useEffect, useState, useCallback, useMemo } from 'react'
import {
  TableContainer,
  Button,
  Text,
  Flex,
  InputGroup,
  Input,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  ButtonGroup,
  Img,
  useToast,
  Spinner
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
function ImportProductTable({ importData, deleteRow }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState([...importData])
  const toast = useToast()
  const [columnFilters, setColumnFilters] = useState([])

  // Memoized toast configurations to reduce redundancy
  const toastConfig = useMemo(
    () => ({
      duration: 3000,
      isClosable: true,
      position: 'bottom-center'
    }),
    []
  )

  // Centralized toast method
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        ...toastConfig
      })
    },
    [toast, toastConfig]
  )

  // Track selection of rows
  const handleOpenModal = (row) => {
    onOpen()
    setRowSelection(row.original)
  }

  // Update table data when product list changes
  useEffect(() => {
    setTableData(importData)
  }, [importData])

  // Handle row deletion
  // const handleDeleteRow = async (row) => {
  //   try {
  //     setRowSelection(row.original)
  //     const updatedData = tableData.filter(
  //       (item) => item.product_name !== row.original.product_name
  //     )
  //     setTableData(updatedData)
  //   } catch (error) {}
  // }

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            isChecked={table.getIsAllRowsSelected()}
            isIndeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            borderColor={useColorMode().colorMode == 'light' ? 'black' : 'white'}
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
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value}</Text>
        },
        enableSorting: false
      },
      {
        accessorKey: 'import_quantity',
        header: 'Qty',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value}</Text>
        }
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
          ) : row.length !== 0 ? (
            <Flex>
              <EditRowButton handleOpenModal={() => handleOpenModal(row)} />{' '}
              <DeleteRowButton handleDeleteRow={() => deleteRow(row, setRowSelection)} />
            </Flex>
          ) : (
            ''
          )
      }
    ],
    []
  )
  const table = useReactTable({
    data: importData,
    columns,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false,
    state: {
      rowSelection,
      columnFilters
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    enableRowSelection: true,
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
      {/* Rest of the component remains the same */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxH={'max-content'} maxW={'max-content'} minW={'lg'}>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
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

export default ImportProductTable
