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
  Spinner,
  Text
} from '@chakra-ui/react'
import UserTable from './table/UserTable'
import CategoryTable from './table/CategoryTable'
import AddCategoryModal from './modal/AddCategoryModal'
import AddUserModal from './modal/AddUserModal'
import AddProductModal from './modal/AddProductModal'
import useRole from '../hooks/useRole'
import useCategory from '../hooks/useCategory'
import useUser from '../hooks/useUser'
const menuLeft = [
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
const menuRight = [
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
  const { data: roleData, loading: roleLoading, error: roleError, fetchRoleData } = useRole()
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
    getCategory
  } = useCategory()
  const { data: userData, loading: userLoading, error: userError, getUser } = useUser()
  const [isTable, setIsTable] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalType, setModalType] = useState('')

  const copiedUserData = userData ? JSON.parse(JSON.stringify(userData)) : []
  const handleOpenModal = (type, boolean) => {
    getUser()
    getCategory()
    fetchRoleData()
    setIsTable(boolean)
    setModalType(type)
    onOpen()
  }
  const mainModal = (loading, error, modal) => {
    if (loading) {
      return <Spinner />
    } else if (error) {
      return <Text color={'red'}>{error}</Text>
    } else {
      return modal
    }
  }
  let modal
  let title
  let table
  let tableTitle
  switch (modalType) {
    case 'User':
      title = 'Insert User'
      modal = mainModal(
        roleLoading,
        roleError,
        <AddUserModal closeModal={onClose} data={roleData} />
      )
      tableTitle = 'User Table'
      table = mainModal(
        userLoading,
        userError,
        <UserTable closeModal={onClose} data={copiedUserData} />
      )
      break
    case 'Category':
      title = 'Insert Category'
      modal = <AddCategoryModal closeModal={onClose} data={categoryData} />
      tableTitle = 'Category Table'
      table = mainModal(
        categoryLoading,
        categoryError,
        <CategoryTable closeModal={onClose} data={categoryData} />
      )
      break
    case 'Product':
      title = 'Insert Product'
      modal = mainModal(
        categoryLoading,
        categoryError,
        <AddProductModal closeModal={onClose} data={categoryData} />
      )
      tableTitle = 'Product'
      table = mainModal(
        categoryLoading,
        categoryError,
        <CategoryTable closeModal={onClose} data={categoryData} />
      )
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isTable ? tableTitle : title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={'100%'} height={'100%'}>
            <Flex
              width={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              {isTable ? table : modal}
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          {menuLeft.map((item) => (
            <ButtonGroup size="sm" isAttached variant="outline" key={item.name}>
              <Button
                leftIcon={item.icon}
                onClick={() => {
                  handleOpenModal(item.name, true)
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
          {menuRight.map((item) => (
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
