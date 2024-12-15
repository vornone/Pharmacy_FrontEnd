import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { TbTrashXFilled } from 'react-icons/tb'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  ButtonGroup,
  Button,
  useDisclosure,
  useBreakpointValue
} from '@chakra-ui/react'

const DeleteRowButton = ({ handleDeleteRow }) => {
  const initialFocusRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleDelete = () => {
    handleDeleteRow()
    onClose()
  }
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton
          icon={<TbTrashXFilled />}
          colorScheme="red"
          size={'md'}
          variant={'ghost'}
          onClick={onOpen}
        />
      </PopoverTrigger>
      <PopoverContent borderColor="blue.800" width={'200px'}>
        <PopoverHeader fontWeight="bold" border="0">
          are you sure?
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <ButtonGroup size="sm" width={'100%'} justifyContent={'flex-end'}>
            <Button colorScheme="red" onClick={onClose}>
              No
            </Button>
            <Button colorScheme="green" ref={initialFocusRef} onClick={handleDelete}>
              Yes
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default DeleteRowButton
