import React, { useState } from 'react'
import { mainData } from '../data/data.js'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text } from '@chakra-ui/react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table'

const columns = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: (props) => <Text>{props.getValue()}</Text>
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (props) => <Text>{props.getValue()}</Text>
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (props) => <Text>{props.getValue()}</Text>
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (props) => <Text>{props.getValue()}</Text>
  }
]

function ModalTable() {
  const [data, setData] = useState(mainData)
  const table = useReactTable({
    data: mainData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <TableContainer maxHeight={'75vh'} overflowY={'auto'}>
      <Table variant={'striped'} bg={'gray.600'}>
        <Thead bg={'black'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
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
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ModalTable
