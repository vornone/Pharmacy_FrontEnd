import React, { useState } from 'react'
import { Button, Center, SimpleGrid, Input, Heading, Flex } from '@chakra-ui/react'
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseTrigger,
  PopoverHeader,
  PopoverBody
} from '@/components/ui/popover'
function NewColorPicker({ onColorChange, disabled, defaultColor }) {
  const [color, setColor] = useState('gray')

  const colors = [
    'gray',
    'red.500',
    'green.500',
    'blue.500',
    'yellow.500',
    'orange.500',
    'purple.500',
    'pink.500',
    'teal.500',
    'cyan.500',
    'indigo',
    'black',
    'white',
    'brown'
  ]
  const displayColor = (colorValue) => {
    return colorValue.replace('.500', '')
  }
  return (
    <>
      <Center width={'100%'}>
        <Flex gap={2} w={'100%'}>
          <PopoverRoot>
            <PopoverTrigger>
              <Button
                disabled={disabled}
                aria-label={color}
                background={color}
                height="25px"
                width="25px"
                padding={0}
                minWidth="unset"
                borderRadius={'md'}
              ></Button>
            </PopoverTrigger>

            <PopoverContent width="170px">
              <PopoverCloseTrigger />

              <PopoverHeader height="100px" backgroundColor={color}></PopoverHeader>
              <PopoverArrow />
              <PopoverBody height="120px" borderBottomLeftRadius={20} borderBottomRightRadius={20}>
                <SimpleGrid columns={5} spacing={2} columnGap={2} rowGap={2}>
                  {colors.map((c) => (
                    <Button
                      key={c}
                      aria-label={c}
                      background={c}
                      height="22px"
                      width="22px"
                      padding={0}
                      minWidth="unset"
                      borderRadius={3}
                      onClick={() => {
                        setColor(c)
                      }}
                    ></Button>
                  ))}
                </SimpleGrid>
                <Input
                  borderRadius={3}
                  marginTop={3}
                  placeholder="red.100"
                  size="sm"
                  readOnly
                  value={displayColor(color)}
                  onChange={(e) => {
                    setColor(e.target.value)
                  }}
                />
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
          <Input
            borderRadius={3}
            value={displayColor(color)}
            onChange={(e) => {
              setColor(e.target.value)
            }}
            size="sm"
            placeholder="red.500"
            readOnly
            disabled={disabled}
          />
        </Flex>
      </Center>
    </>
  )
}

export default NewColorPicker
