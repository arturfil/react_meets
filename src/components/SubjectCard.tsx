import React from 'react';

import { Subject } from '@/interfaces/Subject';

interface Props {
  subject: Subject;
}

export default function SubjectCard({ subject }: Props) {
  return (
    <div className="flex h-40 w-60 rounded-xl bg-gray-100 p-2 shadow-md hover:shadow-lg">
      <div className="mx-auto flex flex-col justify-center align-middle">
        <h2 className="text-center text-lg font-bold">{subject.name}</h2>
        <p className="overflow-clip overflow-ellipsis text-wrap text-sm text-gray-600">
          {subject.description}
        </p>
      </div>
    </div>
  );
}
