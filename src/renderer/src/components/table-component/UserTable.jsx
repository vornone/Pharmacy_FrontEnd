import React, { useState } from 'react'
import EditableCell from './EditableCell'
import { TableContainer } from '@chakra-ui/react'
import { userData } from '../../data/data'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
const columns =[
    {
        accessorKey: 'user_id',
        header: 'Id',
        cell: EditableCell
    },
    {
        accessorKey: 'user_name',
        header: 'Name',
        cell: EditableCell
    },
    {
        accessorKey: 'user_role',
        header: 'Role',
        cell: EditableCell
    }
]


function UserTable() {
    const [data, setData] = useState(userData)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
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