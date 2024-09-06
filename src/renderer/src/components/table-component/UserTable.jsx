import React, { useEffect, useState } from 'react'
import EditableCell from './EditableCell'
import { TableContainer, Button, Icon } from '@chakra-ui/react'
// import { userData } from '../../data/data'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { useDispatch } from 'react-redux'
import { retrieveUser } from '../../actions/userActions.js'
import StatusCell from './StatusCell.jsx'
import { IconButton } from '@chakra-ui/react'
import { TbEdit,TbChevronDown,TbChevronUp, TbPlus, TbArrowsSort } from "react-icons/tb";
import { useSelector } from 'react-redux'
const columns =[
    {
        accessorKey: 'user_id',
        header: 'Id',
        cell: EditableCell
    },
    {
        accessorKey: 'username',
        header: 'Name',
        cell: EditableCell,
    },
    {
        accessorKey: 'role_id',
        header: 'Role',
        cell: EditableCell
    },
    {
        header: 'Status',
        cell: StatusCell},
    {
        header: 'Action',
        cell: () => <IconButton  aria-label='Edit' variant={'ghost'} colorScheme='gray' icon={<TbEdit />} size={'sm'} width={'100%'}/>
    }
]


function UserTable() {

    const dispatch = useDispatch();
    useEffect( ()=>{
        dispatch(retrieveUser())
        
    }, [retrieveUser])
    const userData = useSelector((state) => state.userReducer.userList.data.list)

    const [data, setData] = useState(userData);
    const table = useReactTable({
        data,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
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
    if(userData)console.log(userData)
  return (
    <TableContainer borderRadius={10} border={'1px'} borderColor={'gray.600'} >
        <Table  variant={"simple"}>
            <Thead  >
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}  >
                        {headerGroup.headers.map((header) => (
                            <Th key={header.id} onClick={header.column.getToggleSortingHandler()}  >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getCanSort() && (
                                
                            <IconButton
                            cursor={'pointer'}
                                    colorScheme='gray'
                                as= {{   
                                    false: TbArrowsSort,
                                    asc: TbChevronDown,
                                    desc: TbChevronUp,
                                }[header.column.getIsSorted()]
                                }
                                disabled
                                
                                mx={3}
                                boxSize={4}
                                
                                variant={'unstyled'}
                                
                                
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
  )
}

export default UserTable