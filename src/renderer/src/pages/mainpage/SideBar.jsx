import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  Separator,
  IconButton,
  Tooltip,
  Stack
} from '@chakra-ui/react'
import {
  FiDatabase,
  FiTable,
  FiUsers,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiHome
} from 'react-icons/fi'
import { TbPackageImport } from 'react-icons/tb'

import {
  ColorModeButton,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue
} from '@/components/ui/color-mode'
const NavItem = ({ icon, children, isActive, onClick, hasSeparator }) => {
  const activeColor = useColorModeValue('gray.700', 'white')
  const inactiveColor = useColorModeValue('gray.500', 'gray.400')
  const activeBg = useColorModeValue('gray.100', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <>
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
          <Text fontSize={'xs'}>{children}</Text>
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
    </>
  )
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [activeItem, setActiveItem] = useState('Database')

  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.950')

  const navItems = [
    { name: 'Home', icon: FiHome, hasSeparator: true },
    { name: 'Database', icon: FiDatabase },
    { name: 'Tables', icon: FiTable },
    { name: 'Authentication', icon: FiUsers },
    { name: 'Settings', icon: FiSettings }
  ]
  useEffect(() => {
    console.log(isCollapsed)
  }, [isCollapsed])
  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }
  return (
    <Box
      p={2}
      pos="fixed"
      as="nav"
      h="100%"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={bgColor}
      borderRight="1px solid white"
      borderRightColor={borderColor}
      w={isCollapsed ? '55px' : '200px'} // Use template literals
      transition="width 0.2s"
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <VStack spacing="0" align="stretch">
        {navItems.map((item) => (
          <Box key={item.name}>
            {!isCollapsed ? (
              <NavItem
                icon={item.icon}
                isActive={item.name === activeItem}
                onClick={() => setActiveItem(item.name)}
                hasSeparator={item.hasSeparator}
              >
                {item.name}
              </NavItem>
            ) : (
              <NavItem
                icon={item.icon}
                isActive={item.name === activeItem}
                onClick={() => setActiveItem(item.name)}
                hasSeparator={item.hasSeparator}
              >
                {!isCollapsed && item.name}
              </NavItem>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar
