
import React, { useEffect, useState } from "react";
import useProduct from '../../hooks/useProduct';
import { useToast } from "@chakra-ui/react";
const TestAPI = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [productData, setProductData] = useState({product_name: ""});
    const { data, loading, error, insertFile } = useProduct(selectedImage, productData);
    const toast= useToast()

    const handleUploadFile = (event) => {

        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) { // Check if it's an image
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file)); // Create a preview URL
          } else {
            alert('Please select a valid image file.'); // Alert for invalid file
          }
    };
    const handleProductChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value });
        console.log(productData);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedImage) {
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
        <input type="input" style={{ border: "1px solid black" }} name="product_name" onChange={handleProductChange} />
      <input type="file" onChange={handleUploadFile}  accept="image/*" />
      <button type="submit">Upload File</button>
    </form>
    {
        loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : data ? <p>{data.product.product_name}</p> : null
    }
  </div>;
};

export default TestAPI;
