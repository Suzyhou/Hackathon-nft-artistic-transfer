import {useState, useEffect} from "react"
import { ChakraProvider,Center, VStack, HStack, Heading,Text, Button, SimpleGrid,Image} from "@chakra-ui/react"

function App() {
    const [orignFile, setOriginFile] = useState(null)
    const [styleFile, setStyleFile] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [isSelected, setIsSelected] =useState(false)
    const [uploadSuccessful, setUploadSuccessful] = useState(false)
    const [transferPath,setTransferPath] = useState(null)
    const [save_path, setSavePath] = useState('d.jpg')
    const [pin_path, setPinPath] = useState(null)
    const [mintRecept, setMintRecept] = useState(null)
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
            console.log(data)
            setUploadSuccessful(!uploadSuccessful)
            setOriginFile(data.filename)
        })
    }

    const onStyleUpload = (e) => {
        const formData = new FormData()
        console.log(selectedFile)
        formData.append('file', selectedFile, selectedFile.image)
        fetch("http://127.0.0.1:8000/upload",{
            method:'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setUploadSuccessful(!uploadSuccessful)
            setStyleFile(data.filename)
        })
    }

    const compileTransfer = (e)=>{
        fetch("http://127.0.0.1:8000/neural-transfer",{
            method:'POST',    
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "content_path":orignFile,
                "style_path":styleFile,
                "save_path":save_path
            })
        })
        .then(response => response.blob())
        .then(imageBlob => {
            // Then create a local URL for that image and print it 
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setTransferPath(imageObjectURL);
            console.log(imageObjectURL);
        });
    }

    const pinOnClick = (e)=>{
        fetch(`http://127.0.0.1:8000/pin`,{
            method:'POST',    
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                fileName:save_path
            })
        })
        .then(response => response.json())
        .then(data => {
            setPinPath(data)
            console.log(data['IpfsHash'])
        });
    }

    const styleOnClick = (e) =>{
        let targetId = e.target.id;
        setStyleFile(targetId);
    }

    const mintOnClick = (e)=>{
        fetch(`http://127.0.0.1:3333/mint`,{
            method:'POST',    
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                dest:pin_path
            })
        })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            setMintRecept(data)
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
                                <Button colorScheme="blue" onClick={styleOnClick} id='starrynight.png'>Select</Button>
                            </VStack>
                            <VStack>
                                <Image borderRadius={25} boxSize="300px" src="images/pixelart.png"></Image>
                                <Button colorScheme="blue" onClick={styleOnClick} id="pixelart.png">Select</Button>
                            </VStack>
                            <VStack>
                                <Image borderRadius={25} boxSize="300px" src="images/abstract.png"></Image>
                                <Button colorScheme="blue" onClick={styleOnClick} id="abstract.png">Select</Button>
                            </VStack>
                        </SimpleGrid>
                    </HStack>
                    <Text>or upload the style</Text>
                    <HStack>
                        <input 
                            type='file' 
                            onChange={onInputChange}>
                        </input>
                        <Button colorScheme="blue" isDisabled={!isSelected} onClick={onStyleUpload}>Upload your style</Button>
                    </HStack>
                    <Heading>Artistic Transfer</Heading>
                    <HStack>
                        <VStack>
                        <Image borderRadius={25} boxSize="300px" src={transferPath}></Image>
                        <Button colorScheme="blue" onClick={compileTransfer}>Compile</Button>
                        <Button colorScheme="blue" onClick={pinOnClick}>Upload to Pinata</Button>
                        </VStack>
                    </HStack>
                    <Heading>Mint Your NFT</Heading>
                    <Button colorScheme="blue" onClick={mintOnClick}>Mint</Button>
                </VStack>
            </Center> 
        </ChakraProvider>
    )
}
export default App;
