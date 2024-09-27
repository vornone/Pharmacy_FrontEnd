import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Flex, HStack, IconButton } from '@chakra-ui/react'
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
  useDisclosure,
  Spinner
} from '@chakra-ui/react'
import ModalTable from './ModalTable'
import UserTable from './table-component/UserTable'
import useGetAllUser from '../hooks/useGetAllUser'
import AddCategoryModal from './AddCategoryModal'
import AddUserModal from './AddUserModal'
import AddProductModal from './AddProductModal'
import useGetAllUserRole from '../hooks/useGetAllUserRole'
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
  const { data: roleData, loading: roleLoading, error: roleError, fetchRoleData } = useGetAllUserRole();
  const { data: userData, loading: userLoading, error: userError, fetchData } = useGetAllUser()
  const [isTable, setIsTable] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalType, setModalType] = useState('')
  const handleOpenModal = (type, boolean) => {
    setIsTable(boolean)
    setModalType(type)
    onOpen()
  }
  let modal
  let title
  let table
  let tableTitle
  switch (modalType) {
    case 'User':
      title = 'Insert User'
      modal = roleLoading ? <Spinner /> : <AddUserModal closeModal={onClose} data={roleData} />
      tableTitle='User Table'
      table = userLoading ? <Spinner /> : <UserTable  data={userData} />
      break
    case 'Category':
      title = 'Insert Category'
      modal = <AddCategoryModal closeModal={onClose} />
      tableTitle='Category Table'
      table = userLoading ? <Spinner /> : <UserTable data={userData} />

      break
    case 'Product':
      title = 'Insert Product'
      modal = <AddProductModal />
      tableTitle='Product'
      table = userLoading ? <Spinner /> : <UserTable data={userData} />
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isTable? tableTitle : title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={'60vh'} height={'60vh'} ><Flex  width={'100%'}  justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>{isTable? table : modal}</Flex></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          {dataLeft.map((item) => (
            <ButtonGroup size="sm" isAttached variant="outline" key={item.name}>
              <Button
                leftIcon={item.icon}
                onClick={() => {
                  fetchData(), handleOpenModal(item.name, true)
                }}
              >
                {item.name}
              </Button>
              <IconButton
                aria-label="Add to friends"
                icon={<TbPlus />}
                colorScheme="green"
                variant={'solid'}
                onClick={() => {
                  fetchRoleData(), handleOpenModal(item.name, false)
                }}
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
