import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  useToast,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const ENDPOINT = "https://boiling-sands-05775-faf135588ab1.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);

/**
 * ChatRoom component where users can join chat rooms, send and receive messages, and see active users.
 */
function ChatRoom() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [privateMsg, setPrivateMsg] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const toast = useToast();

  /**
   * Joins a chat room by emitting a joinRoom event to the server.
   */
  const joinRoom = () => {
    if (username && room) {
      socket.emit("joinRoom", { username, room });
    }
  };

  /**
   * Sends a public chat message to the current room.
   */
  const sendMessage = () => {
    if (message) {
      socket.emit("chatMessage", { room, message });
      setMessage("");
    }
  };

  /**
   * Sends a private message to a selected user.
   */
  const sendPrivateMessage = () => {
    if (privateMsg && receiverId) {
      socket.emit("privateMessage", { receiverId, message: privateMsg });
      setPrivateMsg("");
    }
  };

  /**
   * useEffect hook to set up Socket.IO event listeners for messages,
   * private messages, room data updates, and notifications.
   * Cleans up listeners on component unmount.
   */
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    socket.on("privateMessage", (msg) => {
      toast({
        title: `Private message from ${msg.from}`,
        description: msg.message,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    });

    socket.on("roomData", ({ users }) => {
      setActiveUsers(users);
    });

    socket.on("notification", (notification) => {
      toast({
        title: notification,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    });

    return () => {
      socket.off("message");
      socket.off("privateMessage");
      socket.off("roomData");
      socket.off("notification");
    };
  }, [toast]);

  const borderColor = useColorModeValue("brand.200", "brand.300");

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl" color="brand.400">
        Chat Room: {room}
      </Text>
      <HStack>
        <Input
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          borderColor={borderColor}
        />
        <Input
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          borderColor={borderColor}
        />
        <Button colorScheme="blue" onClick={joinRoom} isFullWidth={true}>
          Join Room
        </Button>
      </HStack>
      <Box
        w="100%"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        borderColor={borderColor}
      >
        {messages.map((msg, index) => (
          <Text key={index} color="brand.300">
            {msg.user}: {msg.text}
          </Text>
        ))}
      </Box>
      <HStack>
        <Input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          borderColor={borderColor}
        />
        <Button colorScheme="teal" onClick={sendMessage}>
          Send
        </Button>
      </HStack>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="receiver-select">
            Send Private Message To:
          </FormLabel>
          <Select
            id="receiver-select"
            onChange={(e) => setReceiverId(e.target.value)}
          >
            {activeUsers.map((user, index) => (
              <option key={index} value={user.id}>
                {user.username}
              </option>
            ))}
          </Select>
        </FormControl>
        <Input
          placeholder="Private Message"
          value={privateMsg}
          onChange={(e) => setPrivateMsg(e.target.value)}
          borderColor={borderColor}
        />
        <Button colorScheme="purple" onClick={sendPrivateMessage}>
          Send PM
        </Button>
      </HStack>
      <Box w="100%" p={4}>
        <Text fontSize="md" color="brand.400">
          Active Users:
        </Text>
        <List spacing={2}>
          {activeUsers.map((user, index) => (
            <ListItem key={index} color="brand.300">
              {user.username}
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
}

export default ChatRoom;
