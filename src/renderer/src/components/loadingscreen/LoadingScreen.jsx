import { Flex, Progress, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return oldProgress + 1 // Increase progress
      })
    }, 20) // Adjust speed here

    return () => clearInterval(interval)
  }, [])

  return (
    <Flex
      position="fixed"
      top="1"
      left="0"
      width="100vw"
      height="100vh"
      align="center"
      justify="center"
      zIndex="9999"
      direction="column"
      p={6}
    >
      <Text fontWeight="bold" mb={4}>
        Loading To App...
      </Text>
      <Progress width="25%" size="sm" colorScheme="blue" value={progress} borderRadius={'full'} />
    </Flex>
  )
}

export default LoadingScreen
