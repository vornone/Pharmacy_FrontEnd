import React, { useState } from "react";
import { Button, ButtonGroup, InputGroup, VStack } from "@chakra-ui/react";
import { Input, InputLeftElement, Icon, HStack, Text } from "@chakra-ui/react";
import  useInsertCategory  from "../hooks/useInsertCategory";


const AddCategoryModal = () => {
    const [category, setCategory]= useState({category_name:"test500", created_by:"admin", last_modified_by:"admin"});
    const {data, loading, error, insertCategory}= useInsertCategory();
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        insertCategory(category);
    }
    console.log(data);
  return (
    <VStack>
        <Input
          type="text"
          placeholder="New Category"
          focusBorderColor="green.300"
          onChange={handleOnChange}
          name="category_name"
        />
                <Input
          type="text"
          placeholder="Created By"
          focusBorderColor="green.300"
          onChange={handleOnChange}
          name="created_by"
        />
                <Input
          type="text"
          placeholder="Modified By"
          focusBorderColor="green.300"
          onChange={handleOnChange}
          name="last_modified_by"
        />
    <HStack width={"100%"} justifyContent={'right'}>
    <ButtonGroup>
    <Button type="submit" colorScheme="green" variant="outline" onSubmit={handleSubmit}>Submit</Button>
    </ButtonGroup>
    </HStack>
    <Text color={'red'}>{error}</Text>
    </VStack>
  );
};

export default AddCategoryModal;
