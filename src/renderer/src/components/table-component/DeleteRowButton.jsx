import React from "react";
import {IconButton} from "@chakra-ui/react";
import {TbTrashXFilled} from "react-icons/tb"
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, Box, ButtonGroup, Button, useDisclosure, useBreakpointValue } from '@chakra-ui/react'

const DeleteRowButton = ({handleDeleteRow}) => {
    const initialFocusRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement='bottom'
      closeOnBlur
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton icon={<TbTrashXFilled/>} colorScheme="red" size={"sm"} variant={"ghost"} onClick={onOpen}/>
      </PopoverTrigger>
      <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
        are you sure?
        </PopoverHeader>
        <PopoverArrow bg='blue.800' />
        <PopoverCloseButton />
        <PopoverBody >
        <ButtonGroup size='sm'>
            <Button colorScheme='red' onClick={onClose}>No</Button>
            <Button colorScheme='green' ref={initialFocusRef} onClick={handleDeleteRow}>
              Yes
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>);
};

export default DeleteRowButton;