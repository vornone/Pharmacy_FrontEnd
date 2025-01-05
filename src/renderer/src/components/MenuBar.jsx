import React, { useMemo, useCallback, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
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
import { FaBoxes } from 'react-icons/fa'
import UserTable from './table/UserTable'
import CategoryTable from './table/CategoryTable'
import AddCategoryModal from './modal/AddCategoryModal'
import AddUserModal from './modal/AddUserModal'
import AddProductModal from './modal/AddProductModal'
import useRole from '../hooks/useRole'
import useCategory from '../hooks/useCategory'
import useUser from '../hooks/useUser'
import ProductTable from './table/ProductTable'
import useProduct from '../hooks/useProduct'
import ImportProductModal from './modal/ImportProductModal'
// Memoized menu items to prevent unnecessary re-renders
const MENU_LEFT = [
  { name: 'Product', icon: <TbArchiveFilled /> },
  { name: 'Import', icon: <FaBoxes /> },
  { name: 'Category', icon: <TbAppsFilled /> },
  { name: 'User', icon: <TbUserFilled /> }
]

const MENU_RIGHT = [
  { name: 'Orders', icon: <TbShoppingCartFilled /> },
  { name: 'Report', icon: <TbChartPieFilled /> },
  { name: 'Admin', icon: <TbUserShield /> }
]

function MenuBar({ orderData, setOrderData }) {
  // Combine hooks to reduce re-renders
  const { data: roleData, loading: roleLoading, error: roleError, fetchRoleData } = useRole()

  const {
    data: productData,
    loading: productLoading,
    error: productError,
    getProduct
  } = useProduct()

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
    getCategory
  } = useCategory()

  const { data: userData, loading: userLoading, error: userError, getUser } = useUser()

  // Use useDisclosure hook for modal management
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Memoize state and derived values
  const [modalType, setModalType] = useState('')
  const [isTable, setIsTable] = useState(false)

  // Memoize data to prevent unnecessary re-renders
  const copiedUserData = useMemo(
    () => (userData ? JSON.parse(JSON.stringify(userData)) : []),
    [userData]
  )

  // Optimize modal rendering with useCallback
  const mainModal = useCallback((loading, error, modal) => {
    if (loading) return <Spinner />
    if (error) return <Text color="red">{error}</Text>
    return modal
  }, [])

  // Memoize modal and table content
  const { modal, title, table, tableTitle } = useMemo(() => {
    switch (modalType) {
      case 'User':
        return {
          title: 'Insert User',
          modal: mainModal(
            roleLoading,
            roleError,
            <AddUserModal closeModal={onClose} data={roleData} />
          ),
          tableTitle: 'User Table',
          table: mainModal(
            userLoading,
            userError,
            <UserTable closeModal={onClose} data={copiedUserData} />
          )
        }
      case 'Category':
        return {
          title: 'Insert Category',
          modal: <AddCategoryModal closeModal={onClose} data={categoryData} />,
          tableTitle: 'Category Table',
          table: mainModal(
            categoryLoading,
            categoryError,
            <CategoryTable closeModal={onClose} data={categoryData} />
          )
        }
      case 'Product':
        return {
          title: 'Insert Product',
          modal: mainModal(
            categoryLoading,
            categoryError,
            <AddProductModal closeModal={onClose} data={categoryData} />
          ),
          tableTitle: 'Product',
          table: mainModal(
            categoryLoading,
            categoryError,
            <ProductTable
              closeModal={onClose}
              data={productData}
              orderData={orderData}
              setOrderData={setOrderData}
            />
          )
        }
      case 'Import':
        return {
          title: 'Import Product',
          modal: mainModal(categoryLoading, categoryError, <ImportProductModal />),
          tableTitle: 'Import Product',
          table: mainModal(
            categoryLoading,
            categoryError,
            <ProductTable
              closeModal={onClose}
              data={productData}
              orderData={orderData}
              setOrderData={setOrderData}
            />
          )
        }
      default:
        return { modal: null, title: '', table: null, tableTitle: '' }
    }
  }, [
    modalType,
    roleLoading,
    roleError,
    userLoading,
    userError,
    categoryLoading,
    categoryError,
    roleData,
    categoryData,
    copiedUserData,
    productData,
    orderData,
    setOrderData,
    onClose,
    mainModal
  ])

  // Optimize handler with useCallback
  const handleOpenModal = useCallback(
    (type, isTable) => {
      onOpen()
      getUser()
      getCategory()
      fetchRoleData()
      setIsTable(isTable)
      setModalType(type)
    },
    [onOpen, getUser, getCategory, fetchRoleData]
  )

  // Optimize logout handler
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('token', 'user.password')
    window.location.reload()
  })

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="max-content" maxH="max-content" minW={'lg'}>
          <ModalHeader>{isTable ? tableTitle : title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="100%" height="100%">
            <Flex width="100%" justifyContent="center" alignItems="center" flexDirection="column">
              {isTable ? table : modal}
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack justifyContent="space-between" alignItems="center">
          {MENU_LEFT.map((item) => (
            <ButtonGroup size="sm" isAttached variant="solid" colorScheme="gray" key={item.name}>
              <Button leftIcon={item.icon} onClick={() => handleOpenModal(item.name, true)}>
                {item.name}
              </Button>
              <IconButton
                aria-label="Add item"
                icon={<TbPlus />}
                colorScheme="green"
                variant="solid"
                onClick={() => handleOpenModal(item.name, false)}
              />
            </ButtonGroup>
          ))}
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          {MENU_RIGHT.map((item) => (
            <ButtonGroup size="sm" isAttached variant="solid" colorScheme="gray" key={item.name}>
              <Button leftIcon={item.icon}>{item.name}</Button>
            </ButtonGroup>
          ))}
          <ButtonGroup size="sm" isAttached variant="outline" colorScheme="gray">
            <Button variant={'solid'} colorScheme="gray">
              <TbSettingsFilled />
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              leftIcon={<IoLogOut />}
              onClick={handleLogout}
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
