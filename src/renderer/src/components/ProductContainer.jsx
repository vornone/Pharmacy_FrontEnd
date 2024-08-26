import React from "react";
import { Box } from "@chakra-ui/react";
function ProductContainer({children}) {
  return (
    <Box width="100%" height="200px" borderRadius={10} overflow={"hidden"}>
    {children}
    </Box>);
}

export default ProductContainer;
