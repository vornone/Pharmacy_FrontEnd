import React from "react";
import { IconButton } from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
const EditRowButton = ({handleOpenModal}) => {
  return (  <IconButton  
    aria-label='Edit' 
    variant={'ghost'} 
    colorScheme='blue' 
    icon={<TbEdit />} 
    size={'md'} 
    onClick={handleOpenModal}  />);
};

export default EditRowButton;
