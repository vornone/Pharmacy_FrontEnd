import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { TbTrashXFilled } from 'react-icons/tb'
import { BiSolidCommentDetail } from 'react-icons/bi'
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

const ShowDetailButton = ({ handleDeleteRow }) => {
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
      <IconButton
        icon={<BiSolidCommentDetail />}
        colorScheme="blue"
        size={'md'}
        variant={'ghost'}
        onClick={onOpen}
      />
    </Popover>
  )
}

export default ShowDetailButton
