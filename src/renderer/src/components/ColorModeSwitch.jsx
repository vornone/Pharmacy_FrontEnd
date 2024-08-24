import React from "react";
import { HStack, Icon, Switch, Text, useColorMode } from "@chakra-ui/react";
import { MdDarkMode ,MdLightMode} from "react-icons/md";
const ColorModeSwitch = ({colorMode,toggleColorMode}) => {

  return (
            <HStack >
                <Switch isChecked={colorMode=="dark"} onChange={toggleColorMode} colorScheme="green" >

                </Switch>
                <Icon as={colorMode=="dark"?MdLightMode:MdDarkMode}></Icon>
                <Text>
                    {colorMode}
                </Text> 
            </HStack>
        )
};

export default ColorModeSwitch;
