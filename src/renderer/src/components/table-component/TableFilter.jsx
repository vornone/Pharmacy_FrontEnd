import { HStack, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import SearchIcon from './table-icon/SearchIcon'
import SearchInput from '../SearchInput'
import { BsSearch } from 'react-icons/bs'
const TableFilter = ({ columnFilters, setColumnFilters, placeholder, column }) => {
  const name = columnFilters.find((f) => f.id === column)?.value || ''

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value
        })
    )

  return (
    <form>
      <InputGroup>
        <InputLeftElement children={<BsSearch />}></InputLeftElement>
        <Input
          
          placeholder={placeholder}
          width={'400px'}
          shadow={'lg'}
          onChange={(e) => onFilterChange(column, e.target.value)}
        ></Input>
      </InputGroup>
    </form>
  )
}
export default TableFilter
