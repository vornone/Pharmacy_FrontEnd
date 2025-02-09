import React from 'react'
import { ColorModeButton } from '@/components/ui/color-mode'
import { HStack, Icon, Flex, Text } from '@chakra-ui/react'
import { VscTerminalBash } from 'react-icons/vsc'
import { createListCollection } from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/components/ui/select'
import { useState } from 'react'
const Header = () => {
  const collection = createListCollection({
    items: [
      { label: 'POS System', value: 'POS System' },
      { label: 'Inventory', value: 'Inventory' }
    ]
  })
  const [platform, setPlatform] = useState(collection.items[0].value)
  return (
    <HStack
      w={'full'}
      justifyContent={'space-between'}
      pt={'2'}
      px={'2'}
      borderBottom={'1px solid gray.700'}
      alignItems={'center'}
    >
      <SelectRoot collection={collection} size="xs" w={'325px'} defaultValue={platform}>
        <SelectTrigger>
          <SelectValueText placeholder={platform} />
        </SelectTrigger>
        <SelectContent value={platform}>
          {collection.items.map((item) => (
            <SelectItem item={item} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <ColorModeButton />
    </HStack>
  )
}

export default Header
