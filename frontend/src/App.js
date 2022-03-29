import {useState, useEffect} from "react"
import { ChakraProvider,Center, VStack, HStack, Heading,Text, Button} from "@chakra-ui/react"

function App() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [isSelected, setIsSelected] =useState(false)
    const [uploadSuccessful, setUploadSuccessful] = useState(false)
    
    const onInputChange = (e) => {
        setIsSelected(true)
        setSelectedFile(e.target.files[0])
    }
    const onFileUpload = (e) => {
        const formData = new FormData()
        console.log(selectedFile)
        formData.append('file', selectedFile, selectedFile.name)
        fetch("http://127.0.0.1:8000/upload",{
            method:'POST',
            body: formData,
            // headers: {
            //     'Content-Type': selectedFile.type,
            //   }
        })
        .then((response) => response.json())
        .then((data) => {
            setUploadSuccessful(!uploadSuccessful)
        })
    }
    return (
        <ChakraProvider>
            <Center bg="black" color="white" padding={8}>
                <VStack spacing={7}>
                    <Heading>Your NFT Image Generator</Heading>
                    <Text>Upload your image here</Text>
                    <HStack>
                        <input 
                            type='file' 
                            onChange={onInputChange}>
                        </input>
                        <Button 
                            size='lg' 
                            colorScheme='red' 
                            isDisabled={!isSelected} 
                            onClick={onFileUpload}>
                                Upload Photo
                        </Button>
                    </HStack>
                </VStack>
            </Center>
        </ChakraProvider>
    )
}

export default App;
