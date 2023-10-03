"use client";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
export default function NewRoutineTable() {
    return (
        <>
            <Table aria-label="Example empty table" className="mb-2">
                <TableHeader>
                    <TableColumn>Exercise</TableColumn>
                    <TableColumn>Sets</TableColumn>
                    <TableColumn>Reps</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            </Table>
        </>
    );
}
