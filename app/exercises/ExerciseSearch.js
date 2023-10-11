import {Input} from "@nextui-org/input";
import { IconSearch } from "@tabler/icons-react";

export default function ExerciseSearch() {
    return (
        <Input 
            type="search" 
            label="Search" 
            startContent={
                <IconSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
        />
    )
}