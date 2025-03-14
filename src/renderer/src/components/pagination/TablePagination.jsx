"use client"

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const TablePagination = ({pageSize, totalCount, setOffset}) => {
  return (
    <Pagination.Root count={totalCount} pageSize={pageSize} >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={ () => setOffset(page.value)}>
              {page.value }
            </IconButton>
          )}
        />
        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}
export default TablePagination
