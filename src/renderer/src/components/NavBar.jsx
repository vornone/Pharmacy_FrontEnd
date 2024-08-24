import { color, filter, HStack, Image, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import logo from "../assets/SVG/logo.svg";
import { ColorModeScript } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
const NavBar = () => {
    const {toggleColorMode, colorMode} = useColorMode();
  return (
            <HStack justifyContent={"space-between"} padding={"1%"} alignItems={"center"} height={"60px"}>
                <Image src={logo} boxSize={"60px"} style={colorMode=="light"?{filter:"invert(1)"}:null}></Image>
                <SearchInput ></SearchInput>
                <ColorModeSwitch colorMode={colorMode} toggleColorMode={toggleColorMode}></ColorModeSwitch>
            </HStack>
        )
};

export default NavBar;
