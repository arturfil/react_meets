import { Badge } from './ui/badge';

interface Props {
  searchOption: string;
  setSearchOption: Function;
}

type RadioType =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | null
  | undefined;

export default function RadioSearchGroup({
  searchOption,
  setSearchOption,
}: Props) {
  let teachersBadge: RadioType = searchOption === 'Teacher' ? 'default' : null;
  let subjectsBadge: RadioType = searchOption === 'Subject' ? 'default' : null;

  return (
    <div className="flox-col flex justify-center gap-3">
      <h2>Search Term:</h2>
      <Badge
        className="cursor-pointer"
        onClick={() => setSearchOption('Teacher')}
        variant={teachersBadge}
      >
        Teachers
      </Badge>
      <Badge
        className="cursor-pointer"
        onClick={() => setSearchOption('Subject')}
        variant={subjectsBadge}
      >
        Subjects
      </Badge>
    </div>
  );
}
