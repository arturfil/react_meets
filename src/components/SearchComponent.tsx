import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CategorySearch() {
  return (
    <div className="mb-10 items-center flex flex-col">
      <h2 className="text-4xl font-bold">
        Search for <span className="text-primary">Tutors</span>{" "}
      </h2>
      <h2 className="mb-2 text-gray-500 text-xl">Book your meeting now! </h2>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button  type="submit">
          <Search className="h-4 w-4 mr-2"/>
          Search
        </Button>
      </div>
    </div>
  );
}

