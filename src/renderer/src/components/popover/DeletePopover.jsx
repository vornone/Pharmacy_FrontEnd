import React from 'react'
import { Button, Group, IconButton, Popover, Portal } from '@chakra-ui/react'
import { MdDeleteForever } from 'react-icons/md'
const DeletePopover = ({onDelete, isLoading, name, item}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen} >
          <Popover.Trigger asChild >
          <IconButton
              aria-label="Delete"
              size="sm"
              variant="ghost"
              colorPalette="red"
            >
              <MdDeleteForever />
            </IconButton>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner >
              <Popover.Content>
                <Popover.Header fontSize="sm" fontWeight="semibold">Deletion Confirmation</Popover.Header>
                <Popover.Arrow />
                <Popover.Body color={'gray.400'}>
                  Are you sure you want to delete this {name}?
                </Popover.Body>
                <Popover.Footer justifyContent={"flex-end"}>
                  <Group>
                    <Button size="xs" variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button size="xs" colorPalette="red" variant={"surface"} onClick={()=>{onDelete(item)}} loading={isLoading} disabled={isLoading}>Delete {name}</Button>
                  </Group>
                </Popover.Footer>
                <Popover.CloseTrigger />
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
  )
}

export default DeletePopover
