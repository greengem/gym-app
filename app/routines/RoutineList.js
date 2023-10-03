"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

function RoutineList({ routines }) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No Routines."}>
        {routines.map((routine) => (
          <TableRow key={routine.id}>
            <TableCell>{routine.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RoutineList;
