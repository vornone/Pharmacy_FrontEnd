import React, { useEffect, useState } from 'react'
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
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast
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
import useCategory from '../../hooks/useCategory.js'
import UpdateCategoryModal from '../modal/UpdateCategoryModal.jsx'
import useUpdateData from '../../hooks/useUpdateData.js'
import useDeleteData from '../../hooks/useDeleteData.js'
import useProduct from '../../hooks/useProduct.js'
import UpdateProductModal from './../modal/UpdateProductModal'
import TableFilter from '../table-component/TableFilter.jsx'

function ProductTable({ data, orderData, setOrderData }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(data)
  const { data: categoryData } = useCategory()
  const {
    data: productListData,
    error: productListError,
    loading: productListLoading,
    getProduct
  } = useProduct()
  const { deleteData: deleteProduct } = useDeleteData()
  const [columnFilters, setColumnFilters] = useState([])
  const handleOpenModal = (row) => {
    onOpen()
    setRowSelection(row.original)
  }
  useEffect(() => {
    if (!productListError && !productListLoading) {
      setTableData(productListData)
    }
  }, [productListData])

  const handleDeleteRow = async (row) => {
    try {
      setRowSelection(row.original)
      await deleteProduct('product/delete/' + row.original.product_id, 'POST')
      getProduct()
      const updatedData = tableData.filter((item) => item.product_id !== row.original.product_id)
      const updateOrder = orderData.filter((item) => item.product_id !== row.original.product_id)
      setTableData(updatedData)
      setOrderData(updateOrder)
      console.log(row.original.product_id)
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
      accessorKey: 'product_name',
      header: 'Name',
      cell: EditableCell,
      enableColumnFilter: true
    },
    {
      accessorKey: 'product_price',
      header: 'price',
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

  //Table
  const table = useReactTable({
    data: tableData,
    columns,
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
        //custom initial page index
        pageSize: 5 //custom default page size
      }
    },
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
  //UI
  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'left'} width={'100%'} mb={2}>
        <TableFilter
          setColumnFilters={setColumnFilters}
          placeholder={'Product Name'}
          column={'product_name'}
          columnFilters={columnFilters}
        />
      </Flex>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateProductModal
              categoryData={categoryData}
              rowData={rowSelection}
              closeModal={onClose}
              setOrderData={setOrderData}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <TableContainer borderRadius={10} border={'2px'} borderColor={'gray.600'} width={'100%'}>
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
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id} borderTop={'2px'} borderColor={'gray.600'}>
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
export default ProductTable
