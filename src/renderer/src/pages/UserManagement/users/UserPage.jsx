import { HStack, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import UserTable from '@/renderer/components/table/UserTable'
import UserRoleTable from '@/renderer/components/table/UserRoleTable'
import testUseUser from '@/renderer/src/hooks/testUseUser'
import testUseUserRole from '@/renderer/src/hooks/testUserRole'
const menuItem = ({ name }) => {
  return <Button>{name}</Button>
}

function UserPage() {
  const { data, loading, error, getUser } = testUseUser()
  const {
    data: userRoleData,
    loading: userRoleLoading,
    error: userRoleError,
    getUserRole
  } = testUseUserRole()
  const [activeItem, setActiveItem] = useState('UserTable')

  // Trigger data loading immediately when the component mounts
  useEffect(() => {
    getUser()
    getUserRole()
  }, [])

  // Show loading state while data is being fetched
  if (loading || userRoleLoading) {
    return (
      <Flex w={'100%'} h={'100%'} justify="center" align="center">
        <Text>Loading user data...</Text>
      </Flex>
    )
  }

  // Show error message if data fetching failed
  if (error || userRoleError) {
    return (
      <Flex w={'100%'} h={'100%'} justify="center" align="center">
        <Text color="red.500">Error loading user data: {error.message}</Text>
      </Flex>
    )
  }

  return (
    <Flex w={'100%'} h={'100%'}>
      <VStack
        w={'15%'}
        h={'100%'}
        align={'start'}
        borderRight={'1px solid '}
        borderRightColor={'gray.200'}
        _dark={{ borderRightColor: 'gray.600' }}
      >
        <Flex
          borderBottom={'1px solid'}
          width="100%"
          borderBottomColor={'gray.200'}
          _dark={{ borderBottomColor: 'gray.600' }}
          p={5}
        >
          <Heading>User Page</Heading>
        </Flex>
        <VStack p={5} w={'100%'}>
          <Button
            justifyContent={'start'}
            w={'full'}
            size={'xs'}
            variant={'ghost'}
            onClick={() => setActiveItem('UserTable')}
            bg={activeItem === 'UserTable' ? 'gray.200' : 'transparent'}
            _dark={{ bg: activeItem === 'UserTable' ? 'gray.800' : 'transparent' }}
          >
            User Table
          </Button>
          <Button
            justifyContent={'start'}
            w={'full'}
            size={'xs'}
            variant={'ghost'}
            onClick={() => setActiveItem('UserRole')}
            bg={activeItem === 'UserRole' ? 'gray.200' : 'transparent'}
            _dark={{ bg: activeItem === 'UserRole' ? 'gray.800' : 'transparent' }}
          >
            User Role
          </Button>
        </VStack>
      </VStack>
      <VStack w={'80%'} h={'100%'} p={5}>
        {activeItem === 'UserTable' ? (
          <UserTable userData={data || []} roleData={userRoleData || []} />
        ) : (
          <UserRoleTable />
        )}
      </VStack>
    </Flex>
  )
}

export default UserPage
