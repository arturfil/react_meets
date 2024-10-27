import { Search } from 'lucide-react';

import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
  term: string;
  setSearchTeacherTerm: Function;
}

export default function CategorySearch({ term, setSearchTeacherTerm }: Props) {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold">
        Search for <span className="text-primary">Tutors</span>{' '}
      </h2>
      <h2 className="mb-2 text-xl text-gray-500">Book your meeting now! </h2>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={term}
          onChange={(e) => setSearchTeacherTerm(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search..."
        />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
}
