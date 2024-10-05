import React, { useEffect, useState } from 'react'
import { Image, InputGroup } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { isSameMonth } from 'date-fns'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import {
  Button,
  ButtonGroup,
  HStack,
  VStack,
  Input,
  InputRightAddon,
  Checkbox,
  CheckboxGroup,
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import DatePicker from 'react-datepicker'
import { forwardRef } from 'react'

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Input
    width="100%"
    onClick={onClick}
    ref={ref}
    value={value || ''}
    placeholder="Expiration Date"
    readOnly
  />
))
const AddProductModal = ({ closeModal, data }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [platform, setPlatform] = useState(data.length == 0 ? 'No Data' : data[0].category_name)
  const platformSelectorEvent = (e) => {
    setPlatform(e.category_name)
  }

  return (
    <>
      <VStack width={'100%'} gap={3}>
        <VStack width={'100%'} height={'100%'}>
          <Flex
            justifyContent={'space-between'}
            width={'100%'}
            height={'100%'}
            alignItems={'flex-end'}
          >
            <Box>
              <Image objectFit={'cover'} src="https://via.placeholder.com/150" borderRadius={5} />
            </Box>

            <ButtonGroup height={'100%'} size={'sm'} variant={'outline'} colorScheme="blue">
              <Button>edit image</Button>
            </ButtonGroup>
          </Flex>

          <Input type="text" placeholder="Product Name" colorScheme="green" maxLength={20} />
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<BsChevronDown />}
              variant={'solid'}
              width={'100%'}
              size={'md'}
              textAlign={'left'}
            >
              <Text fontWeight={'regular'}>{platform}</Text>
            </MenuButton>
            <MenuList>
              {data == null ? (
                <MenuItem>No Data</MenuItem>
              ) : (
                data.map((data) => (
                  <MenuItem key={data.category_name} onClick={() => platformSelectorEvent(data)}>
                    {data.category_name}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>
          <InputGroup>
            <Input type="number" placeholder="Product Price" maxLength={5} />
            <InputRightAddon bg={'none'}>$</InputRightAddon>
          </InputGroup>
          <InputGroup>
            <Input type="number" placeholder="Minimum Stock" />
          </InputGroup>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Box width={'100%'}>
              <DatePicker
                width={'100%'}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                customInput={<CustomInput />}
                dateFormat="dd/MMMM/YYYY"
              ></DatePicker>
            </Box>
          </HStack>
        </VStack>
        <HStack width={'100%'} justifyContent={'right'}>
          <ButtonGroup>
            <Button colorScheme="red" variant="outline" size={'sm'} onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme="green" variant="solid" size={'sm'}>
              ADD
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </>
  )
}

export default AddProductModal
