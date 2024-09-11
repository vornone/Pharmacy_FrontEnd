import React, { useEffect, useState } from 'react'
import EditableCell from './EditableCell'
import { TableContainer, Button, Icon, Text, HStack, Flex,ButtonGroup, useColorMode} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { useDispatch } from 'react-redux'
import { retrieveUser } from '../../actions/userActions.js'
import StatusCell from './StatusCell.jsx'
import { IconButton } from '@chakra-ui/react'
import { TbEdit,TbChevronDown,TbChevronUp, TbPlus, TbArrowsSort } from "react-icons/tb";
import { useSelector } from 'react-redux'
import EditUserModal from '../EditUserModal.jsx'
import { useDisclosure } from '@chakra-ui/react'
import EditRowButton from './EditRowButton.jsx'
import DeleteRowButton from './DeleteRowButton.jsx'



function UserTable() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer.userList.data);

    const columns =[
        {
            header: 'N',
            cell: ({row})    => <Text width={50}>{row.index + 1}</Text>
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
            cell: ({row}) => row.length !== 0?<Flex ><EditRowButton  handleOpenModal={() => handleOpenModal(row)}/> <DeleteRowButton handleDeleteRow={() => handleDeleteRow(row)}/></Flex> :"",
        }
    ]
 
    const handleOpenModal = (row) => {
        onOpen();
        setRowSelection(row.original);
    }
    const handleDeleteRow = (row) => {
        const newData = data.filter((item) => item.user_id !== row.original.user_id);
        setData(newData);
    }
    useEffect( ()=>{
        if (userData) setData(userData.list)
        else dispatch(retrieveUser())

   }, [retrieveUser, userData])
   const tableData = [...data];
    const table = useReactTable({
        data,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection,
          },
          initialState: {
            pagination: { //custom initial page index
              pageSize: 5, //custom default page size
            },
          },
          enableRowSelection:" true",
        meta: {
            updateData: (rowIndex, columnId, value) =>
              setData((prev) =>
                prev.map((row, index) =>
                  index === rowIndex
                    ? {
                        ...prev[rowIndex],
                        [columnId]: value,
                      }
                    : row
                )
              ),
          },
    })
    
  return (
    <>
    <EditUserModal isOpen={isOpen} onClose={onClose} data={rowSelection}></EditUserModal>
    <TableContainer borderRadius={10} border={'2px'} borderColor={'gray.600'} >
        <Table  variant={"simple"}>
            <Thead  bgColor={useColorMode().colorMode === 'dark' ? 'gray.800' : 'gray.300'}  >
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}  >
                        {headerGroup.headers.map((header) => (
                            <Th key={header.id}  borderColor={'gray.600'} textColor={useColorMode().colorMode === 'dark' ? 'gray.200' : 'black'} >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getCanSort() && (
                                
                            <IconButton

                            cursor={'pointer'}
                                    colorScheme='white'
                                    icon={header.column.getIsSorted() === 'asc' ? <TbChevronUp />: header.column.getIsSorted() === 'desc' ?<TbChevronDown />: <TbArrowsSort /> }
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
                    <Tr key={row.id}    borderTop={'1px'} borderColor={'gray.600'}>
                        {row.getVisibleCells().map((cell) => (
                            <Td key={cell.id}   border={'0px'} borderColor={'gray.600'} >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>

    </TableContainer>
    <br/>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
      </ButtonGroup>
    </>
  )
}

export default UserTable