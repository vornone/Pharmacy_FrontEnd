
import React, { useEffect, useState } from "react";
import useProduct from '../../hooks/useProduct';
import { useToast } from "@chakra-ui/react";
const TestAPI = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { data, loading, error, insertFile } = useProduct(selectedProduct);
    const toast= useToast()

    const handleUploadFile = (event) => {
        setSelectedProduct(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedProduct) {
            toast({
                title: "Error",
                description: "Please select a file",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try{
            insertFile();
            toast({
                title: "Success",
                description: "File uploaded successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }catch(error){
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

  return <div style={{ textAlign: "center", padding: "20px" }}>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleUploadFile} />
      <button type="submit">Upload File</button>
    </form>
  </div>;
};

export default TestAPI;
