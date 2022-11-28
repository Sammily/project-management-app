import { AddIcon } from '@chakra-ui/icons';
import { Badge, Box, Heading, IconButton, Stack, useColorModeValue } from '@chakra-ui/react';
import useColumnDrop from '../hook/useColumnDrop';
import useColumnTasks from '../../components/hook/useColumnTasks';
import { ColumnType } from '../../utils/enums';
import Task from '../Task/Task';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Blocked: 'red',
  Completed: 'green',
};

function Column({ column }: { column: ColumnType }) {
  const { tasks, addEmptyTask, deleteTask, dropTaskFrom, swapTasks, updateTask } =
    useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onUpdate={updateTask}
      onDelete={deleteTask}
    />
  ));

  return (
    <Box>
      <Stack
        ref={dropRef}
        display="flex"
        justifyContent="s"
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={1}
        bgColor="white"
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        <Heading fontSize="md" mb={4} letterSpacing="wide">
          <Badge px={2} py={1} rounded="lg" colorScheme={ColumnColorScheme[column]}>
            {column}
          </Badge>
        </Heading>
        {ColumnTasks}
      </Stack>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        mt={2}
        variant="solid"
        onClick={addEmptyTask}
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
        boxShadow="md"
      />
    </Box>
  );
}

export default Column;
