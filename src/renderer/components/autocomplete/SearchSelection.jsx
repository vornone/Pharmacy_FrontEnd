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

function SearchSelection({ collection, onChange, disabled, selectedValue }) {
  return (
    <>
      <AutoComplete
        openOnFocus
        emptyState="No results found"
        listAllValuesOnFocus
        closeOnSelect
        closeOnBlur
        w={'100%'}
      >
        {({ isOpen }) => (
          <>
            <InputGroup endElement={<Icon>{isOpen ? <FiChevronRight /> : <FiChevronDown />}</Icon>}>
              <AutoCompleteInput
                variant="subtle"
                placeholder="Search..."
                disabled={disabled}
                value={selectedValue}
              />
            </InputGroup>
            <AutoCompleteList>
              {collection.map((item, index) => (
                <AutoCompleteItem key={`item-${index}`} value={item} textTransform="capitalize">
                  {item}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </>
        )}
      </AutoComplete>
    </>
  )
}

export default SearchSelection
