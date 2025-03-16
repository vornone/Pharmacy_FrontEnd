import { VStack, Heading, Flex, Button, Spinner } from '@chakra-ui/react';
import React, { Suspense, useMemo, useCallback, useTransition, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

// Lazy-load the components
const UserTable = React.lazy(() => import('@/renderer/src/components/table/UserTable'));
const UserRoleTable = React.lazy(() => import('@/renderer/src/components/table/UserRoleTable'));

// Loading fallback component
const LoadingFallback = React.memo(() => (
  <Flex justify="center" align="center" width="full" height="full" minH="200px">
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Flex>
));

// Separated Sidebar component to prevent re-renders of the entire page
const Sidebar = React.memo(({ activeItem }) => {
  return (
    <VStack
      w="15%"
      h="100%"
      align="start"
      borderRight="1px solid"
      borderRightColor="gray.200"
      _dark={{ borderRightColor: 'gray.600' }}
      flexShrink={0} // Prevent sidebar from shrinking
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
      <VStack p={5} w="full" align="stretch" spacing={2}>
        <Link to="/usermanagement/UserTable">
          <Button
            justifyContent="start"
            w="full"
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
            w="full"
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
  );
});

// Route-specific component wrappers to prevent unnecessary re-renders
const UserTableRoute = React.memo(() => (
  <Suspense fallback={<LoadingFallback />}>
    <UserTable />
  </Suspense>
));

const UserRoleRoute = React.memo(() => (
  <Suspense fallback={<LoadingFallback />}>
    <UserRoleTable />
  </Suspense>
));

// Content component with optimized routing
const Content = React.memo(() => {
  return (
    <VStack w="85%" h="100%" p={5} spacing={0} align="flex-start">
      <Routes>
        <Route path="/" element={<UserTableRoute />} />
        <Route path="/UserTable" element={<UserTableRoute />} />
        <Route path="/UserRole" element={<UserRoleRoute />} />
      </Routes>
    </VStack>
  );
});

// Pre-load components to improve switching performance
const preloadComponents = () => {
  const preloadUserTable = () => import('@/renderer/src/components/table/UserTable');
  const preloadUserRoleTable = () => import('@/renderer/src/components/table/UserRoleTable');
  
  // Start preloading immediately
  preloadUserTable();
  preloadUserRoleTable();
};

function UserPage() {
  const location = useLocation();
  const [isPending, startTransition] = useTransition();
  
  const activeItem = useMemo(() => {
    const currentPage = location.pathname.split('/').pop();
    return currentPage === 'UserRole' ? 'UserRole' : 'UserTable';
  }, [location.pathname]);

  // Preload components after the initial render
  useEffect(() => {
    preloadComponents();
  }, []);

  return (
    <Flex w="100%" h="100%" overflow="hidden">
      <Sidebar activeItem={activeItem} />
      <Content />
      {isPending && <LoadingFallback />}
    </Flex>
  );
}

export default UserPage;