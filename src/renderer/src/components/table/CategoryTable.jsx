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

function CategoryTable({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(data)
  const { deleteCategory, getCategory } = useCategory()
  const {data:editData, loading:updateLoading,error:updateError,updateData } = useUpdateData('category/update', 'POST')	
  const handleOpenModal = (row) => {
    onOpen()
    setRowSelection(row.original)
  }

  const handleUpdateRow = (updatedRow) => {
    updateData(updatedRow)
    const newData = tableData.map(row => row.category_id === updatedRow.category_id ? updatedRow : row);
    setTableData(newData); // Update the table data // Close the modal
    onClose();

  };

  const handleDeleteRow = async (row) => {
    try {
      deleteCategory({ category_id: row.original.category_id }) // Call the delete API
      const updatedData = tableData.filter((item) => item.category_id !== row.original.category_id)
      setTableData(updatedData)
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
      accessorKey: 'category_name',
      header: 'Name',
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
    state: {
      rowSelection
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
  return (
    <>
         <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateCategoryModal rowData={rowSelection} onClose={onClose} data={editData} loading={updateLoading} error={updateError} updateData={handleUpdateRow}></UpdateCategoryModal>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
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
export default CategoryTable
