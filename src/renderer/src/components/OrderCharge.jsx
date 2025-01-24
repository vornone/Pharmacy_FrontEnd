import React, { useState, useEffect } from 'react'
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

import { RiDiscountPercentFill } from 'react-icons/ri'
import OrderReciept from './modal/OrderReciept'
import { useToast } from '@chakra-ui/react'
import OrderConfirmModal from './modal/OrderConfirmModal'
function OrderCharge({ data }) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [discount, setDiscount] = useState(0)
  
  const subTotal = data.reduce((acc, cur) => {
    const itemPrice = cur.discount_price ?? cur.product_price
    return acc + parseFloat((itemPrice * cur.orderQuantity).toFixed(2))
  }, 0)
  const discountAmount = parseFloat((discount * subTotal) / 100).toFixed(2)
  const tax = parseFloat(((subTotal - discountAmount) * 0.1).toFixed(2))
  const total = subTotal - discountAmount + tax
  const toast = useToast()


  const [orderCalculation, setOrderCalculation] = useState({
    subTotal: subTotal,
    discountAmount: discountAmount,
    tax: tax,
    total: total
  })
  const handleValidation = () => {
    if (discount > 100 || discount < 0) {
      toast({
        title: 'Error',
        description: 'Discount must be between 0 and 100%',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } else setIsOpen(true)
  }
  useEffect(() => {
    setOrderCalculation({
      subTotal: subTotal,
      discountAmount: discountAmount,
      tax: tax,
      total: total
    })
    console.log(orderCalculation)
  }, [ subTotal, discountAmount, tax, total])
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
              <OrderConfirmModal orderData={[...data]}/>
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
              <Text color={'gray.400'}>${subTotal.toFixed(2)}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} width={'100%'}>
              <Text color={'gray.400'}>Discount:</Text>
              <Text color={'red.500'}>-{discountAmount}</Text>
            </HStack>
            <HStack justifyContent={'space-between'} width={'100%'}>
              <Text color={'gray.400'}>VAT:</Text>
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
                  type="number"
                  isInvalid={discount > 100 || discount < 0}
                  placeholder="Discount...."
                  width={'100%'}
                  shadow={'sm'}
                  onChange={(e) => setDiscount(e.target.value)}
                ></Input>
              </InputGroup>
              <Button
                colorScheme="green"
                width={'100%'}
                onClick={handleValidation}
                isDisabled={discount > 100 || discount < 0}
              >
                Place Order
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Card>
    </>
  )
}

export default OrderCharge
