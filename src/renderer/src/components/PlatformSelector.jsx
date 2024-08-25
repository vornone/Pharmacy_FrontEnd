import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdOutlinePointOfSale } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'
import { FaCommentsDollar } from 'react-icons/fa'

import { TbBox } from 'react-icons/tb'
import { FaCashRegister } from 'react-icons/fa6'

function PlatformSelector() {
  const [platform, setPlatform] = useState('Point of Sale')
  const [icon, setIcon] = useState(<MdOutlinePointOfSale />)
  const platformSelectorEvent = (e) => {
    setPlatform(e.menuName)
    setIcon(e.menuIcon)
  }
  const data = [
    {
      menuId: 1,
      menuName: 'Point of Sale',
      menuIcon: <FaCashRegister />
    },
    {
      menuId: 2,
      menuName: 'Transaction',
      menuIcon: <FaCommentsDollar />
    }
  ]
  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton width={200} as={Button} rightIcon={<BsChevronDown />} leftIcon={icon}>
          {platform}
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

export default PlatformSelector
