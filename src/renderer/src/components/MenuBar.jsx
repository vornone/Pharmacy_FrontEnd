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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import ModalTable from './ModalTable'
import UserTable from './table-component/UserTable'


function MenuBar() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleOpenAddUser= () => {
    onOpen()
  }
  const dataLeft = [
    {
      name: 'Product',
      icon: <TbArchiveFilled />,
    },
    {
      name: 'Category',
      icon: <TbAppsFilled />,

    },
    {
      name: 'User',
      icon: <TbUserFilled />,
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
  return (
    <div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Table</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={'50vh'}>
            <UserTable />
          </ModalBody >
          <ModalFooter>
            <Button variant="outline" colorScheme='red'>close</Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          {dataLeft.map((item) => (
            <ButtonGroup size="sm" isAttached variant="outline" key={item.name}>
              <Button leftIcon={item.icon}>{item.name}</Button>
              <IconButton
                aria-label="Add to friends"
                icon={<TbPlus />}
                colorScheme="green"
                variant={'solid'}
                onClick={() => handleOpenAddUser()}
              />
            </ButtonGroup>
          ))}
        </HStack>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          {dataRight.map((item) => (
            <ButtonGroup
              size="sm"
              isAttached
              variant={'outline'}
              colorScheme="green"
              key={item.name}
            >
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
        </HStack>
      </HStack>
    </div>
  )
}

export default MenuBar
