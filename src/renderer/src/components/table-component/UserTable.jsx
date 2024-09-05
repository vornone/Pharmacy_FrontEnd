import React, { useEffect, useState } from 'react'
import EditableCell from './EditableCell'
import { TableContainer } from '@chakra-ui/react'
// import { userData } from '../../data/data'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveUser } from '../../actions/UserActions.js'
const columns =[
    {
        accessorKey: 'user_id',
        header: 'Id',
        cell: EditableCell
    },
    {
        accessorKey: 'username',
        header: 'Name',
        cell: EditableCell
    },
    {
        accessorKey: 'role_id',
        header: 'Role',
        cell: EditableCell
    }
]


function UserTable() {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer.userList.data.list)
    useEffect( ()=>{
        dispatch(retrieveUser())
        
    }, [retrieveUser])

    const [data, setData] = useState(userData);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    if(userData)console.log(userData)
  return (
    <TableContainer>
        <Table>
            <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody>
                {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Td key={cell.id}>
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