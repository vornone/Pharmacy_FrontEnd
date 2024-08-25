import React from 'react'
import { Button, ButtonGroup, HStack, IconButton } from '@chakra-ui/react'
import { IoLogOut } from 'react-icons/io5'
import {
  TbArchiveFilled,
  TbPlus,
  TbAppsFilled,
  TbUserFilled,
  TbUserShield,
  TbChartPieFilled,
  TbShoppingCartFilled,
  TbLogout,
  TbSettingsFilled
} from 'react-icons/tb'

const dataLeft = [
  {
    name: 'Product',
    icon: <TbArchiveFilled />
  },
  {
    name: 'Category',
    icon: <TbAppsFilled />
  },
  {
    name: 'User',
    icon: <TbUserFilled />
  }
]
const dataRight = [
  {
    name: 'Orders',
    icon: <TbShoppingCartFilled />
  },
  {
    name: 'Report',
    icon: <TbChartPieFilled />
  },
  {
    name: 'Admin',
    icon: <TbUserShield />
  }
]
function MenuBar() {
  return (
    <div>
      <HStack justifyContent={'space-between'} alignItems={'center'} height={'60px'}>
        <HStack
          justifyContent={'space-between'}
          padding={'1%'}
          alignItems={'center'}
          height={'60px'}
        >
          {dataLeft.map((item) => (
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button leftIcon={item.icon}>{item.name}</Button>
              <IconButton
                aria-label="Add to friends"
                icon={<TbPlus />}
                colorScheme="green"
                variant={'solid'}
              />
            </ButtonGroup>
          ))}
        </HStack>
        <HStack
          justifyContent={'space-between'}
          padding={'1%'}
          alignItems={'center'}
          height={'60px'}
        >
          {dataRight.map((item) => (
            <ButtonGroup size="sm" isAttached variant={'solid'} colorScheme="green">
              <Button leftIcon={item.icon}>{item.name}</Button>
            </ButtonGroup>
          ))}
          <ButtonGroup size="sm" isAttached variant={'outline'} colorScheme="gray">
            <Button>
              <TbSettingsFilled />
            </Button>
            <Button
              variant={'outline'}
              leftIcon={<IoLogOut />}
              _hover={{ bg: 'red.400', color: 'white', outline: 'none', variant: 'solid' }}
            >
              Log Out
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" isAttached></ButtonGroup>
        </HStack>
      </HStack>
    </div>
  )
}

export default MenuBar
