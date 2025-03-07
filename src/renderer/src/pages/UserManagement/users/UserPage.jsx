import { HStack, VStack, Text, Heading, Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import UserTable from '@/renderer/components/table/UserTable'
import UserRoleTable from '@/renderer/components/table/UserRoleTable'
import useUser from '@/renderer/src/hooks/useUser'
import useUserRole from '@/renderer/src/hooks/useUserRole'
import LoadingScreen from '@/renderer/components/loadingscreen/LoadingScreen'
const menuItem = ({ name }) => {
  return <Button>{name}</Button>
}

function UserPage() {
  const { data, loading, error, getUser } = useUser()
  const {
    data: userRoleData,
    loading: userRoleLoading,
    error: userRoleError,
    getUserRole
  } = useUserRole()
  const [activeItem, setActiveItem] = useState('UserTable')

  // Trigger data loading immediately when the component mounts
  useEffect(() => {
    getUser()
    getUserRole()
  }, [])



  return (
    <LoadingScreen error={error} isLoading={loading}>
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
          px={5}
          py={3.5}
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
          <UserRoleTable roleData={userRoleData || []} />
        )}
      </VStack>
    </Flex>
    </LoadingScreen>
  )
}

export default UserPage
