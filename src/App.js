import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  extendTheme,
  CSSReset,
} from "@chakra-ui/react";
import ChatRoom from "./components/ChatRoom";

// Custom theme configuration for Chakra UI
const theme = extendTheme({
  colors: {
    brand: {
      100: "#DCF2F1", // Light Teal
      200: "#7FC7D9", // Medium Teal
      300: "#365486", // Dark Blue
      400: "#0F1035", // Very Dark Blue
    },
  },
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Roboto", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "brand.300" : "brand.200",
          color: "white",
          _hover: {
            bg: "brand.300",
          },
        }),
      },
    },
    Text: {
      baseStyle: {
        color: "brand.400",
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        color: "brand.300",
        backgroundColor: "brand.100",
      },
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

/**
 * App component serving as the root of the Chat Application.
 * It applies a custom theme using ChakraProvider and renders the main ChatRoom component.
 */
function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box textAlign="center" fontSize="xl">
        <VStack spacing={8} marginTop={10}>
          <Text fontSize="4xl" fontWeight="bold">
            Welcome to the Chat App!
          </Text>
          <ChatRoom />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
