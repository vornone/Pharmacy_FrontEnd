import { useState, useEffect } from "react";
import { Progress, Box, Text } from "@chakra-ui/react";

const LoadingScreen = ({ children, isLoading, error }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0); // Reset progress when loading stops
      return;
    }

    let interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 100); // Progress updates every 100ms

    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Progress.Root minW="500px" value={progress}  variant={'outline'} colorPalette="green">
      <Progress.Label mb="2">
        Loading....
      </Progress.Label>
      <Progress.Track >
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="red.500" fontSize="xl">❌ Fetching data failed. Please try again.</Text>
      </Box>
    );
  }

  return children;
};

export default LoadingScreen;
