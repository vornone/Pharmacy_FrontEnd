import React, { useState } from "react";
import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Grid,
  Flex
} from "@chakra-ui/react";
import useProduct from "../../hooks/useProduct";
const SearchableSelect = ({ options, placeholder, onSelect }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton
          as={Button}
          onClick={() => setIsOpen(!isOpen)}
          w="full"
          textAlign="left"
        >
          {placeholder}
        </MenuButton>
        <MenuList>
          <Box px="3" py="2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <MenuItem
                key={option.value}
                onClick={() => {
                  onSelect(option.label);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </MenuItem>
            ))
          ) : (
            <Text px="3" py="2" color="gray.500">
              No options found
            </Text>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};
function ImportProductModal() {

    const {data, loading, error, getProduct } = useProduct()
    const [selectedProduct, setSelectedProduct] = useState("");
    const options = data?.map((item) => ({
      value: item.product_id,
      label: item.product_name
    }))
      const handleSelect = (label) => {
        console.log("Selected:", label);
      };
  return <>
  <Flex width={"100%"}>
    <Grid width={"100%"} templateColumns="repeat(2, 1fr)" gap={2}>
    <SearchableSelect
        options={options}
        placeholder={"Select Product"}
        onSelect={handleSelect}
      />
    <Input placeholder="Import Price" />
    <Input placeholder="Import Quantity" />
    <Input placeholder="Shipping Price" />
    <Input placeholder="Total Price" />
        </Grid>

  </Flex>
  
  
  </>;
}

export default ImportProductModal;
