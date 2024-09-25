import React, { useState } from 'react'
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
import useGetAllUser from '../hooks/useGetAllUser'
import AddCategoryModal from './AddCategoryModal'
import AddUserModal from './AddUserModal'
import AddProductModal from './AddProductModal'
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
  const { data, loading, error } = useGetAllUser()
  const [isTable, setIsTable] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalType, setModalType ] = useState('')
  const handleOpenModal= (type, boolean) => {
    setModalType(type)
    setIsTable(boolean)
    onOpen()
  }
  let modal;
  let title;
  let table;
  switch (modalType) {
    case 'User':
      title="Insert User"
      modal= <AddUserModal closeModal={onClose}/>
      table= <UserTable data={data} />
      break;
    case 'Category':
      title="Insert Category"
      modal= <AddCategoryModal closeModal={onClose} />
      table= <UserTable data={data} />
      break;
    case 'Product':
      title="Insert Product"
      modal= <AddProductModal />
      table= <UserTable data={data} />
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={'60vh'}>
            {isTable ? table:modal}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          {dataLeft.map((item) => (
            <ButtonGroup size="sm" isAttached variant="outline" key={item.name}>
              <Button leftIcon={item.icon} onClick={() => handleOpenModal(item.name,true)}>{item.name}</Button>
              <IconButton
                aria-label="Add to friends"
                icon={<TbPlus />}
                colorScheme="green"
                variant={'solid'}
                onClick={() => handleOpenModal(item.name,false)}
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
