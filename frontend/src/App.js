import {useState, useEffect} from "react"
import { ChakraProvider,Center, VStack, HStack, Heading,Text, Button, SimpleGrid,Image} from "@chakra-ui/react"

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
        formData.append('file', selectedFile, selectedFile.image)
        fetch("http://127.0.0.1:8000/upload",{
            method:'POST',
            body: formData
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
                    <Text>Choose the artistic style</Text>
                    <HStack>
                        <SimpleGrid columns={3} spacing={8}>
                            <VStack>
                                <Image borderRadius={25} boxSize="300px" src="images/starrynight.png"></Image>
                                <Button colorScheme="blue">Select</Button>
                            </VStack>
                            <VStack>
                                <Image borderRadius={25} boxSize="300px" src="images/pixelart.png"></Image>
                                <Button colorScheme="blue">Select</Button>
                            </VStack>
                            <VStack>
                                <Image borderRadius={25} boxSize="300px" src="images/abstract.png"></Image>
                                <Button colorScheme="blue">Select</Button>
                            </VStack>
                        </SimpleGrid>
                    </HStack>
                    <Text>or upload the style</Text>
                    <HStack>
                        <input 
                            type='file' 
                            onChange={onInputChange}>
                        </input>
                        <Button colorScheme="blue" isDisabled={!isSelected} >Upload your style</Button>
                    </HStack>
                    <Heading>Mint Your NFT</Heading>
                    <Button colorScheme="blue">Mint</Button>
                </VStack>
            </Center> 
        </ChakraProvider>
    )
}

export default App;
