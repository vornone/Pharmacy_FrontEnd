import React, { useEffect, useState } from 'react'
import EditableCell from './EditableCell'
import { TableContainer, Button, Icon, Text, HStack } from '@chakra-ui/react'
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
            cell: ({row})    => <Text>{row.index + 1}</Text>
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
            cell: ({row}) => <HStack><EditRowButton  handleOpenModal={() => handleOpenModal(row)}/> <DeleteRowButton handleDeleteRow={() => handleDeleteRow(row)}/></HStack>
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

   console.log(userData)

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
    <TableContainer borderRadius={10} border={'1px'} borderColor={'gray.600'} >
        <Table  variant={"simple"}>
            <Thead  >
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}  >
                        {headerGroup.headers.map((header) => (
                            <Th key={header.id}   >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getCanSort() && (
                                
                            <IconButton
                            cursor={'pointer'}
                                    colorScheme='gray'
                                    as={header.column.getIsSorted()==='asc'? TbChevronDown:header.column.getIsSorted()==='desc'? TbChevronUp:TbArrowsSort}
                                onClick={header.column.getToggleSortingHandler()}
                                disabled
                                
                                mx={3}
                                boxSize={4}
                                
                                variant={'ghost'}
                                
                                
                            >{console.log(header.column.getIsSorted())}</IconButton>
                            )}
                           
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody>
                {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id} >
                        {row.getVisibleCells().map((cell) => (
                            <Td key={cell.id} >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </TableContainer>
    </>
  )
}

export default UserTable