import { VStack, Heading, Flex, Button } from '@chakra-ui/react';
import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

// Lazy-load the components
const UserTable = React.lazy(() => import('@/renderer/src/components/table/UserTable'));
const UserRoleTable = React.lazy(() => import('@/renderer/src/components/table/UserRoleTable'));

function UserPage() {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();
  const [activeItem, setActiveItem] = useState('UserTable');

  useEffect(() => {
    if (currentPage === 'UserRole') {
      setActiveItem('UserRole');
    } else {
      setActiveItem('UserTable');
    }
  }, [currentPage]);

  return (
    <Flex w="100%" h="100%">
      <VStack
        w="15%"
        h="100%"
        align="start"
        borderRight="1px solid"
        borderRightColor="gray.200"
        _dark={{ borderRightColor: 'gray.600' }}
      >
        <Flex
          borderBottom="1px solid"
          width="full"
          borderBottomColor="gray.200"
          _dark={{ borderBottomColor: 'gray.600' }}
          px={5}
          py={3.5}
        >
          <Heading size="md">User Page</Heading>
        </Flex>
        <VStack p={5} w="full" align="stretch" >
          <Link to="/usermanagement/UserTable">
            <Button
              justifyContent="start"
              w="full"  // Ensure the button takes up the full width
              size="xs"
              variant="ghost"
              bg={activeItem === 'UserTable' ? 'gray.200' : 'transparent'}
              color={activeItem === 'UserTable' ? 'black' : 'gray.500'}
              _dark={{
                bg: activeItem === 'UserTable' ? 'gray.800' : 'transparent',
                color: activeItem === 'UserTable' ? 'white' : 'gray.500',
              }}
            >
              User Table
            </Button>
          </Link>
          <Link to="/usermanagement/UserRole">
            <Button
              justifyContent="start"
              w="full"  // Ensure the button takes up the full width
              size="xs"
              variant="ghost"
              bg={activeItem === 'UserRole' ? 'gray.200' : 'transparent'}
              color={activeItem === 'UserRole' ? 'black' : 'gray.500'}
              _dark={{
                bg: activeItem === 'UserRole' ? 'gray.800' : 'transparent',
                color: activeItem === 'UserRole' ? 'white' : 'gray.500',
              }}
            >
              User Role
            </Button>
          </Link>
        </VStack>
      </VStack>

      <VStack w="75%" h="100%" p={5}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<UserTable />} />
            <Route path="/UserTable" element={<UserTable />} />
            <Route path="/UserRole" element={<UserRoleTable />} />
          </Routes>
        </Suspense>
      </VStack>
    </Flex>
  );
}

export default UserPage;
