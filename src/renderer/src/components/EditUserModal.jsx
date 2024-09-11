import { Card } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
function EditUserModal({isOpen, onClose ,data}) {
  return (
    
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Check Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            hello {data.username}, you have {data.role_name} role.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

export default EditUserModal;