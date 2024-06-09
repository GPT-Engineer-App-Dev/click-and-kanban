import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Link to="/kanban">
          <Button colorScheme="teal" size="lg">Go to Kanban Board</Button>
        </Link>
        <Link to="/csv-uploader">
          <Button colorScheme="teal" size="lg">Go to CSV Uploader</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default Index;