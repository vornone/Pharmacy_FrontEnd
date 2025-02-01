import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { BsThreeDotsVertical } from "react-icons/bs";

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

const SwitchStatusButton = () => {
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
        icon={<BsThreeDotsVertical />}
        colorScheme="gray"
        size={'md'}
        variant={'ghost'}
        onClick={onOpen}
      />
    </Popover>
  )
}

export default SwitchStatusButton
