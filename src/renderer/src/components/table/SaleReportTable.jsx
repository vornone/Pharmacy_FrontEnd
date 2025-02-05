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
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { dateFormat } from '../../function/dateFormat.js'
import ShowDetailButton from '../table-component/ShowDetailButton.jsx'
const importData = [
  {
    id: 1,
    date: `${dateFormat(new Date())}`,
    orders: 20,
    total: 100.15,
    profit: 50.15,
    sold: 50
  },
  {
    id: 2,
    date: `${dateFormat(new Date())}`,
    orders: 27,
    total: 250.15,
    profit: 70.15,
    sold: 57
  }
]
function SaleReportTable() {
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
        accessorKey: 'id',
        header: 'id',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value}</Text>
        },
        enableSorting: false
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value}</Text>
        }
      },
      {
        accessorKey: 'orders',
        header: 'Order',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value}</Text>
        }
      },
      {
        accessorKey: 'sold',
        header: 'sold',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value} sold</Text>
        }
      },

      {
        accessorKey: 'total',
        header: 'total',
        cell: ({ getValue }) => {
          const value = getValue()
          return value && <Text>${value}</Text>
        }
      },
      {
        accessorKey: 'profit',
        header: 'profit',
        cell: ({ getValue }) => {
          const value = getValue()
          return (
            value && (
              <Text
                color={useColorMode.colorMode === 'dark' ? 'green.300' : 'green.500'}
                fontWeight={'bold'}
              >
                ${value}
              </Text>
            )
          )
        }
      },
      {
        header: 'Detail',
        cell: ({ row }) =>
          !row.getValue('id') ? (
            <Flex height={'35px'}></Flex>
          ) : row.length !== 0 ? (
            <Flex>
              <ShowDetailButton handleOpenModal={() => handleOpenModal(row)} />
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

export default SaleReportTable
