import { Flex, Field, Icon } from '@chakra-ui/react'
import * as React from 'react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList
} from '@choc-ui/chakra-autocomplete'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { InputGroup } from '@/components/ui/input-group'

function SearchSelection({ collection, onChange, disabled, selectedValue, name }) {
  const [value, setValue] = React.useState(selectedValue || '')

  // Handle input change (when typing)
  const handleOnChange = (event) => setValue(event.target.value)

  const handleSelect = (selected) => {
    setValue(selected)
    if (onChange) {
      onChange(selected)
    }
  }

  return (
    <AutoComplete
      openOnFocus
      emptyState="No results found"
      listAllValuesOnFocus
      w={'100%'}
      onSelect={handleSelect}
    >
      {({ isOpen }) => (
        <>
          <InputGroup endElement={<Icon>{isOpen ? <FiChevronRight /> : <FiChevronDown />}</Icon>}>
            <AutoCompleteInput
              size={'xs'}
              name={name}
              variant="subtle"
              placeholder="Search..."
              disabled={disabled}
              value={value}
              onChange={handleOnChange}
              fontSize={'sm'}
              border={'1px solid gray'}
            />
          </InputGroup>
          <AutoCompleteList maxH={'100px'} py={2}>
            {collection.map((item, index) => (
              <AutoCompleteItem
                key={`item-${index}`}
                value={item}
                onClick={() => handleSelect(item)}
              >
                {item}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </>
      )}
    </AutoComplete>
  )
}

export default SearchSelection
