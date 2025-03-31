import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Box, VStack, Icon, Text, Flex, Separator, Stack } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TbCashRegister, TbPackageImport, TbLogout2 } from 'react-icons/tb'
import { LuUserCog, LuUser } from "react-icons/lu"
import { FiDatabase, FiTable, FiUsers, FiSettings, FiHome } from 'react-icons/fi'
import { IoList } from 'react-icons/io5'
import { useColorModeValue } from '@/components/ui/color-mode'
import { Tooltip } from "@/components/ui/tooltip"

const navItems = [
  { name: 'Home', icon: FiHome, hasSeparator: true, to: '/home' },
  { name: 'Products', icon: FiDatabase, to: '/product' },
  { name: 'Category', icon: FiTable, to: '/category' },
  { name: 'User Management', icon: FiUsers, to: '/usermanagement' },
  { name: 'POS', icon: TbCashRegister, to: '/pos' },
  { name: 'Sale', icon: IoList, to: '/sale' },
  { name: 'Import', icon: TbPackageImport, hasSeparator: true, to: '/import' },
  { name: 'Settings', icon: FiSettings, to: '/settings' },
  { name: 'Admin', icon: LuUserCog, to: '/admin' }
]

const NavItem = React.memo(({ icon, children, isActive, onClick, hasSeparator, to,name }) => {
  const activeColor = useColorModeValue('gray.700', 'white')
  const inactiveColor = useColorModeValue('gray.500', 'gray.400')
  const activeBg = useColorModeValue('green.200', 'green.700')
  const hoverBg = useColorModeValue('green.200', 'green.700')

  return (
    <>
      <Link to={to}>


        <Stack>
        <Tooltip
          content={name}
          positioning={{ placement: "right-center" }}
          openDelay={100}
          closeDelay={100}
          colorPalette="gray"

        >
          <Flex
            align="center"
            px="3"
            py="3"
            cursor="pointer"
            fontWeight="semibold"
            color={isActive ? activeColor : inactiveColor}
            bg={isActive ? activeBg : 'transparent'}
            borderRadius="lg"
            _hover={{ bg: hoverBg, color: activeColor }}
            onClick={onClick}
          >
            <Icon mr="4" boxSize="4" as={icon} />
            {children && <Text fontSize="xs" whiteSpace="nowrap">{children}</Text>}
          </Flex>
          </Tooltip>
          {hasSeparator && (
            <Separator h="1px" w="full" borderColor={useColorModeValue('gray.200', 'gray.700')} />
          )}
        </Stack>

      </Link>
    </>
  )
})

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.950')

  // Fixed path matching logic to handle subpaths
  const activeItem = useMemo(() => {
    const currentPath = location.pathname;

    // Find the nav item with the longest matching path prefix
    let matchedItem = null;
    let longestMatchLength = 0;

    navItems.forEach(item => {
      const baseRoute = item.to.replace('/*', '');
      if (currentPath.startsWith(baseRoute) && baseRoute.length > longestMatchLength) {
        matchedItem = item;
        longestMatchLength = baseRoute.length;
      }
    });

    return matchedItem?.name || 'Home';
  }, [location.pathname]);

  const handleItemClick = useCallback((to) => {
    // Replace /* with empty string to navigate to the base path
    const navigateTo = to.replace('/*', '');
    navigate(navigateTo);
  }, [navigate]);

  return (
    <Box
      p={2}
      pos="fixed"
      h="100%"
      overflowY="auto"
      bg={bgColor}
      borderRight="1px solid"
      borderRightColor={borderColor}
      w={'55px'}
      transition="width 0.3s"
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <Stack justify="space-between" h="100%">
        <VStack spacing="0" align="stretch">
          {navItems.map((item) => (

            <NavItem
              key={item.name}
              icon={item.icon}
              isActive={item.name === activeItem}
              onClick={() => handleItemClick(item.to)}
              hasSeparator={item.hasSeparator}
              to={item.to.replace('/*', '')}
              name={item.name}
            >
            </NavItem>

          ))}
        </VStack>
        {/* Logout & Profile */}
        <VStack spacing="0" align="stretch" h={'100%'}>
          <Separator h="1px" w="full" borderColor={useColorModeValue('gray.200', 'gray.700')} />
          <NavItem icon={TbLogout2} to="/logout" name="Logout">
            {/* {!isCollapsed && 'Logout'} */}
          </NavItem>
          <NavItem icon={LuUser} to="/profile"  name="Profile">
            {/* {!isCollapsed && 'Profile'} */}
          </NavItem>
        </VStack>
      </Stack>
    </Box>
  )
}

export default React.memo(Sidebar)
