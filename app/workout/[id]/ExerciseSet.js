import { Button, Divider, Input, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { IconPlus, IconTrash } from '@tabler/icons-react';

const ExerciseSet = ({ exerciseItem, workoutData, handleValueChange, handleAddSet, handleDeleteLastSet }) => (
  <Card className="mb-5" key={exerciseItem.Exercise.id}>
    <CardHeader>{exerciseItem.Exercise.name}</CardHeader>
    <Divider />
    <CardBody>
      <Table removeWrapper aria-label="Workout Table">
        <TableHeader>
          <TableColumn>SET</TableColumn>
          <TableColumn>KG</TableColumn>
          <TableColumn>REPS</TableColumn>
        </TableHeader>
        <TableBody>
          {workoutData.find(e => e.id === exerciseItem.Exercise.id).sets.map((set, setIndex) => (
            <TableRow key={setIndex}>
              <TableCell>{setIndex + 1}</TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  onChange={(e) => handleValueChange('weight', exerciseItem.Exercise.id, setIndex, e.target.value)} 
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={set.reps}
                  onChange={(e) => handleValueChange('reps', exerciseItem.Exercise.id, setIndex, e.target.value)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardBody>
    <Divider />
    <CardFooter>
      <Button size="sm" color="secondary" onClick={() => handleAddSet(exerciseItem.Exercise.id)} className="gap-unit-1 mr-2">
        <IconPlus size={16} />Add Set
      </Button>
      <Button size="sm" color="danger" onClick={() => handleDeleteLastSet(exerciseItem.Exercise.id)} className="gap-unit-1">
        <IconTrash size={16} />Delete Last Set
      </Button>
    </CardFooter>
  </Card>
);

export default ExerciseSet;
