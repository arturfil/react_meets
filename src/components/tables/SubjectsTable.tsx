import React, { useState } from 'react';

import { Check, Clipboard } from 'lucide-react';

import { Subject } from '@/interfaces/Subject';

import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';

interface TableProps {
  subjects: Subject[];
}

export default function SubjectsTable({ subjects }: TableProps) {
  return (
    <div className="">
      <h2 className="text-xl font-bold">Subjects</h2>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableCell className="">ID</TableCell>
            <TableCell className="">Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell className="">Category</TableCell>
            <TableCell className="">Copy ID</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects &&
            subjects.map((subject) => (
              <SubjectTableCard
                key={subject.id}
                subject={subject}
              />
            ))}
        </TableBody>
      </Table>
      <div className="mx-auto grid w-full grid-cols-1 place-items-center justify-center sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden"></div>
    </div>
  );
}

interface TableRowProps {
  subject: Subject;
}

function SubjectTableCard({ subject }: TableRowProps) {
  return (
    <TableRow key={subject.id}>
      <TableCell>
        <p className="w-[100px] overflow-clip overflow-ellipsis text-nowrap">
          {subject.id}
        </p>
      </TableCell>
      <TableCell>{subject.name}</TableCell>
      <TableCell>
        <p className="w-auto overflow-clip overflow-ellipsis text-nowrap">
          {subject.description}
        </p>
      </TableCell>
      <TableCell>
        <p className="w-auto overflow-clip overflow-ellipsis text-nowrap">
          {subject.category}
        </p>
      </TableCell>
      <TableCell className="cursor-pointer text-right">
        <Button variant="outline">Select</Button>
      </TableCell>
    </TableRow>
  );
}
