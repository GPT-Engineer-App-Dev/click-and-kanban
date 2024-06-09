import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, useDisclosure } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';

const initialColumns = {
  'column-1': {
    name: 'To Do',
    items: []
  },
  'column-2': {
    name: 'In Progress',
    items: []
  },
  'column-3': {
    name: 'Done',
    items: []
  }
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Kanban Board</Heading>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        <Flex justify="space-between">
          {Object.entries(columns).map(([columnId, column], index) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <VStack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  bg={snapshot.isDraggingOver ? 'blue.100' : 'gray.100'}
                  p={4}
                  borderRadius="md"
                  w="30%"
                  minH="500px"
                >
                  <Heading size="md" mb={4}>{column.name}</Heading>
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          p={4}
                          mb={4}
                          bg={snapshot.isDragging ? 'blue.200' : 'white'}
                          borderRadius="md"
                          boxShadow="md"
                        >
                          {item.content}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
                    Add Card
                  </Button>
                </VStack>
              )}
            </Droppable>
          ))}
        </Flex>
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard;