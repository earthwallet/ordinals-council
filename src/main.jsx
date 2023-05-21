import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  extendTheme,
  Box } from '@chakra-ui/react'
import "@fontsource/poppins"

const brand = {
  colors: {
    blue: '#2496FF',
    green: '#55D171',
    red: '#E22D3F',
    yellow: '#FFD600',
    gold: "#FFA800",
    grey: "#E6E9ED",
    gray: "#A5ACBB",
    space: "#0F1726",
    violet: "#691FDD"
  },
  fonts: {
    primary: `'Poppins', sans-serif`,
  },
}

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};

const theme = extendTheme({ 
  brand: brand,
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "black",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  }
})

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)