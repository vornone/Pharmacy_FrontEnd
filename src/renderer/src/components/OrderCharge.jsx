import React, { useState } from 'react'
import {
  HStack,
  VStack,
  Text,
  Button,
  Card,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex
} from '@chakra-ui/react'
import { TbPlus, TbEdit } from 'react-icons/tb'
import { BsChevronDown } from 'react-icons/bs'
import { RiDiscountPercentFill } from 'react-icons/ri'
import OrderReciept from './modal/OrderReciept'

function OrderCharge({ data }) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [discount, setDiscount] = useState(0)
  const subTotal = data
    .reduce((acc, cur) => acc + parseFloat(cur.product_price * cur.orderQuantity), 0)
    .toFixed(2)
  const discountAmount = parseFloat((discount * subTotal) / 100).toFixed(2)
  const tax = parseFloat(((subTotal - discountAmount) * 0.1).toFixed(2))

  const total = subTotal - discountAmount + tax

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody maxHeight={'100%'} height={'100%'}>
            <Flex
              width={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <OrderReciept orderData={data} ></OrderReciept>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    <Card width={'100%'}>
      <HStack
        alignItems={'top'}
        justifyContent={'space-between'}
        width={'100%'}
        p={3}
        borderRadius={10}
      >
        <VStack alignItems={'flex-start'} width={'100%'}>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Text color={'gray.400'}>Subtotal:</Text>
            <Text color={'gray.400'}>${subTotal}</Text>
          </HStack>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Text color={'gray.400'}>Discount:</Text>
            <Text color={'green.500'}>-{discountAmount}</Text>
          </HStack>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Text color={'gray.400'}>Tax:</Text>
            <Text color={'gray.400'}>${tax}</Text>
          </HStack>

          <HStack justifyContent={'space-between'} width={'100%'}>
            <Text fontSize={'lg'}>Total:</Text>
            <Text fontSize={'lg'}>${total.toFixed(2)}</Text>
          </HStack>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <InputGroup colorScheme="white">
              <InputLeftElement children={<RiDiscountPercentFill />}></InputLeftElement>
              <Input
                placeholder="Discount...."
                width={'100%'}
                shadow={'sm'}
                type="number"
                onChange={(e) =>
                  e.target.value > 100
                    ? (e.target.value = 100)
                    : e.target.value < 0
                      ? (e.target.value = 0)
                      : setDiscount(e.target.value)
                }
              ></Input>
            </InputGroup>
            <Button colorScheme="green" width={'100%'} onClick={() => setIsOpen(true)}>
              Confirm
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Card>
    </>
  )
}

export default OrderCharge
