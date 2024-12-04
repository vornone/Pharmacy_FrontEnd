import React, { useEffect, useState } from 'react'
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
  Img
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
import useCategory from '../../hooks/useCategory.js'
import useDeleteData from '../../hooks/useDeleteData.js'
import useProduct from '../../hooks/useProduct.js'
import UpdateProductModal from './../modal/UpdateProductModal'
import TableFilter from '../table-component/TableFilter.jsx'
import { serverUrl } from '../../api-clients/api-clients.js'
import useUpdateProduct from '../../hooks/useUpdateProduct.js'
function ProductTable({ data, orderData, setOrderData }) {
  const imgApi = serverUrl + '/images/'
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
  const [discount, setDiscount] = useState(50)
  const [productDiscounts, setProductDiscounts] = useState({})
  const { applyDiscountToMultipleProducts } = useUpdateProduct()
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
    } catch (error) {
      console.error('Error deleting row:', error)
    }
  }

  const applySelectedDiscount = () => {
    const selectedRows = table.getSelectedRowModel().rows.original
    const newDiscounts = {...productDiscounts}
    console.log(selectedRows)
    applyDiscountToMultipleProducts(selectedRows, { product_discount: discount })

    selectedRows.forEach(row => {
      const productId = row.original.product_id
      newDiscounts[productId] = discount
    })
    
    setProductDiscounts(newDiscounts)
  }

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          isChecked={table.getIsAllRowsSelected()}
          isIndeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          isChecked={row.getIsSelected()}
          isIndeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      size: 'sm',
      width: '50px'
    },
    {
      accessorKey: 'product_img',
      header: 'Image',
      cell: ({ getValue }) => {
        const value = getValue()
        return (
                  <Img
                    src={imgApi + value}
                    width="70px"
                    height="70px"
                    objectFit="cover"
                    objectPosition="center"
                  />
        )
      },
      enableSorting: false
    },
    {
      accessorKey: 'product_name',
      header: 'Name',
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
      accessorKey: 'product_qty',
      header: 'Qty',
      cell: ({ getValue }) => {
        const value = getValue()
        return <Text>{value}</Text>
      }
    },
    {
      accessorKey: 'product_price',
      header: 'Price',
      cell: ({ row }) => {
        const productId = row.original.product_id
        const originalPrice = row.original.product_price
        const productDiscount = productDiscounts[productId] || 0

        if (productDiscount > 0) {
          return (
            <>
              <Text textDecoration={'line-through'} color={'gray.400'}>
                ${originalPrice.toFixed(2)}
              </Text>
              <Text>
                ${((originalPrice * (100 - productDiscount)) / 100).toFixed(2)}
              </Text>
            </>
          )
        } else {
          return <Text>${originalPrice.toFixed(2)}</Text>
        }
      }
    },
    {
      header: 'discount',
      cell: ({ row }) => {
        const productId = row.original.product_id
        const productDiscount = productDiscounts[productId] || 0
        if (productDiscount > 0) {
          return <Text color={'green.400'}>{productDiscount}%</Text>
        } else {
          return <Text color={'gray.400'}>none</Text>
        }
      },
    },
    
    {
      accessorKey: 'category_id',
      header: 'Cat',
      cell: ({ getValue }) => {
        const value = getValue()
        return <Text>{categoryData.find((item) => item.category_id === value).category_name}</Text>
      }
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
      <Flex justifyContent={'space-between'} alignItems={'center'} width={'100%'} mb={2}>
        <TableFilter
          setColumnFilters={setColumnFilters}
          placeholder={'Product Name'}
          column={'product_name'}
          columnFilters={columnFilters}
        />
        <InputGroup gap={2} borderRadius={10} justifyContent={'flex-end'} alignItems={'center'}>
          <Input
            type='number'
            width={'70px'}
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            max={100}
            min={0}
          />
          <Button 
            colorScheme={'green'} 
            size={'sm'}  
            onClick={applySelectedDiscount}
            isDisabled={table.getSelectedRowModel().rows.length === 0}
          >
            Apply Discount
          </Button>
        </InputGroup>
      </Flex>

      <Modal size={'md'} isOpen={isOpen} onClose={onClose} isCentered>
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