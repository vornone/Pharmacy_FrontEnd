import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  Separator,
  Stack
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbCashRegister } from 'react-icons/tb';
import { LuUserCog } from 'react-icons/lu';
import {
  FiArchive,
  FiBox,
  FiDatabase,
  FiTable,
  FiUsers,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiHome
} from 'react-icons/fi';
import { TbPackageImport } from 'react-icons/tb';
import { useColorModeValue } from '@/components/ui/color-mode';

const NavItem = ({ icon, children, isActive, onClick, hasSeparator, to }) => {
  const activeColor = useColorModeValue('gray.700', 'white');
  const inactiveColor = useColorModeValue('gray.500', 'gray.400');
  const activeBg = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

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
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();

  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.950');

  const navItems = [
    { name: 'Home', icon: FiHome, hasSeparator: true, to: '/' },
    { name: 'Products', icon: FiDatabase, to: '/product' },
    { name: 'Category', icon: FiTable, to: '/category' },
    { name: 'User Management', icon: FiUsers, to: '/usermanagement' },
    { name: 'POS', icon: TbCashRegister, to: '/pos' },
    { name: 'Import', icon: TbPackageImport, hasSeparator: true, to: '/import' },
    { name: 'Settings', icon: FiSettings, to: '/settings' },
    { name: 'Admin', icon: LuUserCog, to: '/admin' }
  ];

  useEffect(() => {
    // Find the active item based on the current path
    const active = navItems.find(item => item.to === location.pathname);
    if (active) {
      setActiveItem(active.name);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.name); // Set the active item
    navigate(item.to); // Navigate to the specified route
  };

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
      borderRight="1px solid"
      borderRightColor={borderColor}
      w={isCollapsed ? '55px' : '200px'}
      transition="width 0.2s"
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <VStack spacing="0" align="stretch">
        {navItems.map((item) => (
          <Box key={item.name}>
            <NavItem
              icon={item.icon}
              isActive={item.name === activeItem}
              onClick={() => handleItemClick(item)}
              hasSeparator={item.hasSeparator}
              to={item.to}
            >
              {!isCollapsed && item.name}
            </NavItem>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;