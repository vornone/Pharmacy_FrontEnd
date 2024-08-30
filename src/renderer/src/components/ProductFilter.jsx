import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button, Text } from '@chakra-ui/react'
import { MdOutlinePointOfSale } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'
import { FaCommentsDollar, FaCashRegister } from 'react-icons/fa'

function ProductFilter() {
  const data = [
    {
      menuId: 1,
      menuName: 'Pharmacy'
    },
    {
      menuId: 2,
      menuName: 'Cloth'
    }
  ]
  const [platform, setPlatform] = useState(data[0].menuName)
  const platformSelectorEvent = (e) => {
    setPlatform(e.menuName)
  }

  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          variant={'outline'}
          width={150}
          size={'sm'}
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

export default ProductFilter
