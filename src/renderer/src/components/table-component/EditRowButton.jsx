import React from "react";
import { IconButton } from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
const EditRowButton = ({handleOpenModal}) => {
  return (  <IconButton  
    aria-label='Edit' 
    variant={'ghost'} 
    colorScheme='blue' 
    icon={<TbEdit />} 
    size={'sm'} 
    width={'100%'} 
    onClick={handleOpenModal}  />);
};

export default EditRowButton;
