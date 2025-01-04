import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button, Text } from '@chakra-ui/react'
import { MdOutlinePointOfSale } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'
import { FaCommentsDollar, FaCashRegister } from 'react-icons/fa'

function ProductSort() {
  const [platform, setPlatform] = useState('All')
  const platformSelectorEvent = (e) => {
    setPlatform(e.menuName)
  }
  const data = [
    {
      menuId: 1,
      menuName: 'By Name'
    },
    {
      menuId: 2,
      menuName: 'By Price'
    },
    {
      menuId: 3,
      menuName: 'By Newest'
    }
  ]
  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          variant={'outline'}
          size={'sm'}
          width={200}
        >
          <Text fontWeight={'regular'}>{platform}</Text>
        </MenuButton>
        <MenuList>
          {data.map((data) => (
            <MenuItem key={data.menuId} onClick={() => platformSelectorEvent(data)}>
              {data.menuName}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default ProductSort
