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
  Spinner,
  Icon
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
import { IoIosArrowBack, IoIosArrowForward, IoMdAddCircle } from 'react-icons/io'
import useCategory from '../../hooks/useCategory.js'
import UpdateProductModal from './../modal/UpdateProductModal'
import { serverUrl } from '../../api-clients/api-clients.js'
import { Badge } from '@chakra-ui/react'
import { FaCircle } from "react-icons/fa";
import SwitchStatusButton from '../table-component/SwitchStatusButton.jsx'
import ShowDetailButton from '../table-component/ShowDetailButton.jsx'


const testData = [
    {
    order_id: '#00001',
    order_date: '2023-08-01',
    order_customer: 'John Doe',
    order_item:5,
    order_status: 'Pending',
    order_total: 100,
    order_delivery:'yes',
  },
  {
    order_id: '#00002',
    order_date: '2024-12-27',
    order_customer: 'John Doe',
    order_item:5,
    order_status: 'Success',
    order_total: 100,
    order_delivery:'no',
  },
  {
    order_id: '#00003',
    order_date: '2025-02-01',
    order_customer: 'John Doe',
    order_item:5,
    order_status: 'Cancelled',
    order_total: 100,
    order_delivery:'yes',
  }]



function OrderTable({ data, orderData, setOrderData }) {
  const imgApi = serverUrl + '/images/'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(testData)
  const { data: categoryData } = useCategory()
  const toast = useToast()
  const [columnFilters, setColumnFilters] = useState([])
  const filterTableByValue = (data, value) => {
    if (value) {
      return data.filter((row) => row.order_status.includes(value))
    } else {
      return data
  }
  }
  

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

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        accessorKey: 'order_id',
        header: 'id',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text fontWeight={'bold'}>{value}</Text>
        },
        enableSorting: false
      },
      {
        accessorKey: 'order_date',
        header: 'date',
        cell: ({ getValue }) => {
          const value = getValue()
          return (
            <Text whiteSpace="normal" wordBreak="break-word" maxWidth="200px" overflow="hidden">
              {value}
            </Text>
          )
        },
        enableColumnFilter: true
      },
      {
        accessorKey: 'order_customer',
        header: 'Customer',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value}</Text>
        }
      },
      {
        accessorKey: 'order_item',
        header: 'Item',
        cell: ({ getValue }) => {
          const value = getValue()
          return <Text>{value}</Text>
        }
      },
      {
        accessorKey: 'order_total',
        header: 'Total',
        cell: ({ getValue }) => {
            const value = getValue()
            return <Text>$ {value}</Text>
          }
      },
      {
        accessorKey: 'order_delivery',
        header: 'Delivery',
        cell: ({ getValue }) => {
            const value = getValue()
            return <Text>{value}</Text>
          }
      },
      {
        accessorKey: 'order_status',
        header: 'Status',        
        cell: ({ getValue }) => {
            const value = getValue()
            return {
              'Pending': <Badge colorScheme="orange" borderRadius={'full'}><Text m={1}><Icon as={FaCircle} fontSize={7}></Icon> Pending</Text></Badge>,
              'Success': <Badge colorScheme="green" borderRadius={'full'}><Text m={1}><Icon as={FaCircle} fontSize={7}></Icon> Success</Text></Badge>,
              'Cancelled': <Badge colorScheme="red" borderRadius={'full'}><Text m={1}><Icon as={FaCircle} fontSize={7}></Icon> Cancelled</Text></Badge>,
            }[value]
          }
      },
      {
        header: 'Action',
        cell: ({ row }) =>
          row.length !== 0 ? (
            <Flex>
                                <SwitchStatusButton/>
              <ShowDetailButton handleOpenModal={() => handleOpenModal(row)} />

            </Flex>
          ) : (
            ''
          )
      }
    ],
    [categoryData]
  )

  const table = useReactTable({
    data: tableData,
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
      <TableContainer borderRadius={10}  borderColor={'gray.500'} width={'100%'}>
        <Table variant={useColorMode().colorMode === 'light' ? 'simple' : 'unstyled'}>
          <Thead bgColor={useColorMode().colorMode === 'dark' ? 'gray.600' : 'gray.300'}>
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
            {tableData.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id} borderTop={'1px'} borderColor={'gray.600'}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} border={'0px'} borderColor={'gray.600'}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td textAlign={'center'} colSpan={columns.length} justifyContent={'center'}>
                  <Text>No data</Text>
                </Td>
              </Tr>
            )}
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

export default OrderTable;
