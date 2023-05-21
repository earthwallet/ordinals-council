import { useState, useEffect } from "react";
import { SignClient } from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";
import { 
  Container,
  Text, 
  Spacer, 
  Button, 
  Heading, 
  Box, 
  Flex, 
  FormControl, 
  Input,
  Image,
  FormLabel, 
  FormHelperText, 
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  Stack,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import FileUpload from "./components/FileUpload.jsx"
import Footer from "./components/Footer.jsx"
import Favicon from './assets/images/favicon.png';
import axios from 'axios';
import { createTx } from 'taproot-sdk';

const web3Modal = new Web3Modal({
  projectId: '5a9fd92ce23a58d83e5f881d1a8ef28c',
  walletConnectVersion: 2
});

function App() {
  const [signClient, setSignClient] = useState();
  const [session, setSession] = useState([]);
  const [namespaces, setNamespaces] = useState([]);
  const [chains, setChains] = useState([]);
  const [account, setAccount] = useState();
  const [whitelisted, setWhitelisted] = useState();
  const [txnUrl, setTxnUrl] = useState();
  const [mintAmount, setMintAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  // Setup Wallet Connect Signer
  async function createClient() {
    try {
      const desc = document.querySelector('meta[name="description"]')?.content
      console.log(Favicon)
      const signClient = await SignClient.init({
        projectId: '5a9fd92ce23a58d83e5f881d1a8ef28c',
        metadata: {
          description: document.title,
          url: window.location.href,
          icons: [Favicon],
          name: window.location.href
        }
      });
      setSignClient(signClient);
      await subscribeToEvents(signClient);
    } catch (e) {
      console.log(e);
    }
  }

  // Intiate Wallet Connection and pass pairing uri to modal
  async function connectWallet() {
    if (!signClient) throw Error("Client is not set");
    try {
      const requiredNamespaces = {
        bip122: {
          methods: ["btc_send","btc_signMessage", "btc_signPsbt"],
          chains: ["bip122:000000000019d6689c085ae165831e93"],
          events: []
        }
      };
      const { uri, approval } = await signClient.connect({ requiredNamespaces });

      if (uri) {
        // QRCodeModal.open(uri) - Could also generate a custom QR code
        web3Modal.openModal({ uri });
        const sessionNamespace = await approval();
        onSessionConnected(sessionNamespace);
        web3Modal.closeModal();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function disconnectWallet() {
    try {
      await signClient.disconnect({
        topic: session.topic,
        message: "User disconnected",
        code: 6000,
      });
      setAccount();
      setSession([]);
      setNamespaces([]);
      setChains([]);
    } catch (e) {
      console.log(e);
    }
  }

  async function subscribeToEvents(client) {
    if (!client)
      throw Error("Unable to subscribe to events. Client does not exist.");
    try {
      client.on("session_delete", () => {
        console.log("The user has disconnected the session from their wallet.");
        setAccount();
        setSession([]);
        setNamespaces([]);
        setChains([]);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const mint = async () => {
    if (!whitelisted) throw Error("No account found");
    let inscriptionId = ""
    try {
      setLoading(true);
      console.log('loading...')
      const result = await signClient.request({
        topic: session.topic,
        chainId: "bip122:000000000019d6689c085ae165831e93",
        request: {
          method: "btc_send",
          params: {
            fromAddress: account,
            inscriptionId: "",
            recipientAddress: "bc1p79tpcc00l20a8wxwug3ktne0wxq5qeg5x6s0s3tna08q0w0tx9qsujgsed",
            recipientAmount: 0.00007034,
            feeRate: 10,
            payFee: false
          },
        },
      });
      setLoading(false);
      setTxnUrl(result);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  const checkWhitelist = async (key) => {
    let result = await axios.get('http://localhost:8787/whitelisted/'+key);
    let whitelisted = result.data ? JSON.parse(result.data) : false;
    console.log(whitelisted, whitelisted ? 'User is whitelisted' : 'Not whitelisted');
    setWhitelisted(whitelisted);
    return;
  }

  const onSessionConnected = (session) => {
    console.log("Established Session:", session);
    // setSession(session)
    setSession(session);
    const allNamespaceAccounts = Object.values(session.namespaces)
      .map((namespace) => namespace.accounts)
      .flat();
    setAccount(allNamespaceAccounts[0]?.split(":")[2]);
    checkWhitelist(account);
    const allNamespaceChains = Object.keys(session.namespaces);
    setChains(allNamespaceChains);
  }

  useEffect(() => {
    if (!signClient) {
      createClient();
    }
  }, [signClient]);

  return (
    <Box className="App" height='100vh'  bgColor='black' >

      <Flex minWidth='max-content' alignItems='center' p={7} gap='2'>
        <Image width={300} src="src/assets/images/council.webp" />
        <Spacer />
        <Button colorScheme='gray' onClick={connectWallet}>Connect Earth Wallet</Button>
      </Flex> 
    
      <Container h='100%'>

      {!account ? <Box pt={150}>
        <Heading size='lg' textAlign="center" fontSize='50px' color="white">
          The Council Mint
        </Heading>
        <FormControl variant="floating" id="address" mb={10} mt={10} color="gray" isRequired>
          <Input textAlign="center" placeholder=" " value={account} onBlur={(e) => checkWhitelist(e.target.value)}/>
          {/* It is important that the Label comes after the Control due to css selectors */}
          <FormLabel textAlign="center">Enter Bitcoin Taproot Address</FormLabel>
          <FormHelperText textAlign="center">{whitelisted ? 'You are on the Council' : 'You are not on the Council'}</FormHelperText>
        </FormControl>
      </Box> : <Box>
        <Heading size='lg' textAlign="center" mt={20} mb={10} fontSize='50px' color="white">
          Select Mint Amount
        </Heading>
        <NumberInput  defaultValue={1} min={1} max={10} color='white' w='100%' mr='20rem' value={mintAmount} onChange={(value) => setMintAmount(value)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          mt={10}
          flex='1'
          focusThumbOnChange={false}
          value={mintAmount}
          min={1} max={10}
          onChange={(value) => setMintAmount(value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize='sm' boxSize='32px' children={mintAmount} />
        </Slider>
        <Stack direction='row' spacing={4}>
          {!whitelisted ?
            <Stack>
              <Text p={5} color='white' textAlign="center">You are not whitelisted, please download Earth Wallet to claim your free mint</Text>
              <Button colorScheme='gray' onClick={connectWallet}>iOS</Button><Button colorScheme='gray' onClick={connectWallet}>Android</Button>

            </Stack> :
            !loading ?
              <Button w="100%" mt={10} colorScheme='black' variant='solid' onClick={mint}>
                Mint
              </Button> :
              <Button
                isLoading
                loadingText='Submitting'
                colorScheme='teal'
                variant='outline'
              >
                Submit
              </Button>
          }
        </Stack>
      </Box>}
    </Container>
    <Footer/>
  </Box>);
}

export default App
