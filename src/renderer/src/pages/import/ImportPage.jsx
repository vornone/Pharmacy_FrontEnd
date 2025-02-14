import { HStack, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useColorMode, useColorModeValue, ColorModeButton } from '@/components/ui/color-mode'
import { Link } from 'react-router-dom'
import DataTable from '@/renderer/components/table/DataTable'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Icon, IconButton } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Separator } from '@chakra-ui/react'
import { LuSearch, LuSlidersHorizontal } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'
const NavItem = ({ icon, children, isActive, onClick, hasSeparator, to }) => {
  const activeColor = useColorModeValue('gray.700', 'white')
  const inactiveColor = useColorModeValue('gray.500', 'gray.400')
  const activeBg = useColorModeValue('gray.100', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <>
      <Link to={to}>
        <Stack>
          <Flex
            align="center"
            px="3"
            py="3"
            cursor="pointer"
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            color={isActive ? activeColor : inactiveColor}
            bg={isActive ? activeBg : 'transparent'}
            borderRadius={'lg'}
            _hover={{
              bg: hoverBg,
              color: activeColor
            }}
            onClick={onClick}
          >
            <Icon mr="4" boxSize="4" as={icon} />
            {children && <Text fontSize={'xs'}>{children}</Text>}
          </Flex>
          {hasSeparator && (
            <Separator
              m={0}
              orientation="horizontal"
              h="1px"
              w="full"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            />
          )}
        </Stack>
      </Link>
    </>
  )
}
function ImportPage() {
  return (
    <Flex w={'100%'} h={'100%'}>
      <Flex
        borderRight={'1px solid'}
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={'20%'}
        h={'100%'}
      >
        <Flex
          borderBottom={'1px solid'}
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          w={'100%'}
          p={5}
        >
          <Heading size={'lg'}>Import Page</Heading>
        </Flex>

        <VStack h={'100%'} w={'100%'} p={5} align={'flex-start'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Import Page
          </Text>
          <Text fontSize={'sm'}>Import Page</Text>
        </VStack>
      </Flex>
      <VStack w={'80%'} h={'100%'} p={10}>
        <Flex w="full" justify="space-between" gap={5}>
          {' '}
          <InputGroup flex="1" startElement={<LuSearch />}>
            <Input placeholder="Search Product" w="50%" size={'xs'} />
          </InputGroup>
          <IconButton variant={'outline'} size={'xs'}>
            <LuSlidersHorizontal />
          </IconButton>
          <ButtonGroup variant={'surface'} colorPalette={'purple'} size={'xs'}>
            <Button>New Import</Button>
          </ButtonGroup>
        </Flex>{' '}
        <DataTable />
      </VStack>
    </Flex>
  )
}

export default ImportPage
