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
import useCategory from '../../hooks/useCategory.js'
import useDeleteData from '../../hooks/useDeleteData.js'
import useProduct from '../../hooks/useProduct.js'
import UpdateProductModal from './../modal/UpdateProductModal'
import TableFilter from '../table-component/TableFilter.jsx'
import { serverUrl } from '../../api-clients/api-clients.js'
import useUpdateProduct from '../../hooks/useUpdateProduct.js'
import { debounce } from 'lodash'
function ProductTable({ data, orderData, setOrderData }) {
  const imgApi = serverUrl + '/images/'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(data)
  const { data: categoryData } = useCategory()
  const toast = useToast()
  const {
    data: productListData,
    error: productListError,
    loading: productListLoading,
    getProduct
  } = useProduct()
  const {
    data: discountData,
    loading: discountLoading,
    error: discountError,
    addDiscount
  } = useUpdateProduct()
  const { deleteData: deleteProduct } = useDeleteData()
  const [columnFilters, setColumnFilters] = useState([])
  const [discount, setDiscount] = useState(0)
  const debouncedGetProduct = useMemo(() => debounce(getProduct, 300), [getProduct])

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
    if (!productListError && !productListLoading) {
      setTableData(productListData)
    }
  }, [productListData])

  // Handle row deletion
  const handleDeleteRow = async (row) => {
    try {
      setRowSelection(row.original)
      await deleteProduct('product/delete/' + row.original.product_id, 'POST')
      const updatedData = tableData.filter((item) => item.product_id !== row.original.product_id)
      const updateOrder = orderData.filter((item) => item.product_id !== row.original.product_id)
      setTableData(updatedData)
      setOrderData(updateOrder)
      debouncedGetProduct()
      showToast('Success', 'Product deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting row:', error)
      showToast('Error', 'Failed to delete product', 'error')
    }
  }

  // Apply discount to selected rows
  const applySelectedDiscount = async () => {
    // Validate discount percentage
    if (discount < 0 || discount > 100) {
      showToast('Invalid Discount', 'Discount must be between 0 and 100', 'error')
      return
    }

    const selectedRows = table.getSelectedRowModel().rows

    if (selectedRows.length === 0) {
      showToast('No Products Selected', 'Please select products to apply discount', 'warning')
      return
    }

    try {
      // Batch update discounts with reduced console logging
      const discountPromises = selectedRows.map((row) =>
        addDiscount(row.original.product_id, { product_discount: discount })
      )

      // Wait for all discount updates to complete
      const results = await Promise.allSettled(discountPromises)

      // Check for any failed updates with more efficient error handling
      const failedUpdates = results.filter((result) => result.status === 'rejected')
      if (failedUpdates.length > 0) {
        showToast(
          'Partial Update',
          `${failedUpdates.length} out of ${results.length} product updates failed`,
          'warning'
        )
      }

      // Efficiently update local state
      const updatedData = tableData.map((item) => {
        const selectedRow = selectedRows.find((row) => row.original.product_id === item.product_id)
        return selectedRow ? { ...item, product_discount: discount } : item
      })

      const updatedOrderData = orderData.map((orderItem) => {
        const matchingProduct = updatedData.find(
          (product) => product.product_id === orderItem.product_id
        )
        return matchingProduct
          ? {
              ...orderItem,
              product_discount: matchingProduct.product_discount,
              discount_price:
                matchingProduct.product_price * (1 - matchingProduct.product_discount / 100)
            }
          : orderItem
      })
      // Update state
      setTableData(updatedData)
      setOrderData(updatedOrderData)
      debouncedGetProduct()
      if (!productListError && !productListLoading) {
        showToast(
          'Discount Applied',
          `${selectedRows.length} product(s) updated with ${discount}% discount`,
          'success'
        )
      }
    } catch (error) {
      console.error('Error applying discounts:', error)
      showToast('Error', 'Failed to apply discounts', 'error')
    }
  }

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
            borderColor={useColorMode().colorMode == 'light' ? 'gray.500' : 'white'}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            isChecked={row.getIsSelected()}
            isIndeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            borderColor={'gray.500'}
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
            <Text whiteSpace="normal" wordBreak="break-word" maxWidth="200px" overflow="hidden" fontWeight={600}>
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
          const productDiscount = row.original.product_discount || 0

          if (productDiscount > 0) {
            return (
              <>
                <Text textDecoration={'line-through'} color={'gray.400'}>
                  ${originalPrice.toFixed(2)}
                </Text>
                <Text>${((originalPrice * (100 - productDiscount)) / 100).toFixed(2)}</Text>
              </>
            )
          } else {
            return <Text>${originalPrice.toFixed(2)}</Text>
          }
        }
      },
      {
        accessorKey: 'product_discount',
        header: 'Discount',
        cell: ({ getValue }) => {
          const discountValue = Number(getValue() || 0)
          if (discountValue > 0) {
            return <Text color={'red.400'}>-{discountValue}%</Text>
          } else {
            return <Text color={'gray.400'}>none</Text>
          }
        }
      },
      {
        accessorKey: 'category_id',
        header: 'Cat',
        cell: ({ getValue }) => {
          const value = getValue()
          return (
            <Text>{categoryData.find((item) => item.category_id === value).category_name}</Text>
          )
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
      <Flex justifyContent={'space-between'} alignItems={'center'} width={'100%'} mb={3} >
        <TableFilter

          setColumnFilters={setColumnFilters}
          placeholder={'Product Name'}
          column={'product_name'}
          columnFilters={columnFilters}
        />
        <InputGroup gap={2} borderRadius={10} justifyContent={'flex-end'} alignItems={'center'}>
          <Input
            type="number"
            width={'100px'}
            onChange={(e) => setDiscount(Number(e.target.value))}
            max={100}
            min={0}
            placeholder="%"
            size={'sm'}
            borderRadius={5}	
          />
          <Button
            colorScheme={'green'}
            size={'sm'}
            onClick={applySelectedDiscount}
            width={'150px'}
            isDisabled={
              table.getSelectedRowModel().rows.length === 0 ||
              discount > 100 ||
              discount < 0 ||
              discountLoading
            }
          >
            {discountLoading ? <Spinner /> : 'Apply Discount'}
          </Button>
        </InputGroup>
      </Flex>

      {/* Rest of the component remains the same */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxH={'max-content'} maxW={'max-content'} minW={'lg'}>
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

      <TableContainer borderRadius={10} borderColor={'gray.500'} width={'100%'}>
        <Table variant="simple">
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

export default ProductTable
