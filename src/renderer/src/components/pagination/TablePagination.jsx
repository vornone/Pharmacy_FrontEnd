import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
  } from "@/components/ui/pagination"

  import React from 'react'
  
  const TablePagination = ({pageSize, pageNumber}) => {
    const [page, setPage] = useState(1)
      const pageSize = 12
    return (
        <PaginationRoot count={items.length * 5}
        page={page}
        pageSize={pageSize}
        onPageChange={(e) => setPage(e.page)}
        variant="solid">
        <HStack wrap="wrap">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    )
  }
  
  export default TablePagination