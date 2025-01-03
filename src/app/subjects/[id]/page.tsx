'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Clipboard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSubjectStore } from '@/store/subject/subject.store';
import { useTeachingStore } from '@/store/teachings/teachings.store';
import { Subject } from '@/interfaces/Subject';

export default function Subjects() {
  const subjects = useSubjectStore((state) => state.subjects);
  const getSubjects = useSubjectStore((state) => state.getSubjects);

  const teachings = useTeachingStore((state) => state.teachings);
  const getTeachings = useTeachingStore((state) => state.getTeachings);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getSubjects();
    getTeachings();
  }, [getSubjects, getTeachings]);

  return (
    <div className='container mx-auto mb-10 mt-16 h-full justify-center'>
      <div className='xs:grid-cols-1 grid sm:grid-cols-1 md:grid-cols-2'>
        <h2 className='mt-4 text-4xl font-semibold'>Subjects</h2>
        <SearchComponent />
      </div>
      <div className='w-[100vw]'>
        <Table className='max-w-4xl max-sm:hidden'>
          <TableHeader>
            <TableRow>
              <TableHead className=''>ID</TableHead>
              <TableHead className=''>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Copy ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects &&
              subjects.length > 0 &&
              subjects.map((subject: Subject) => (
                <tr key={subject.id}>
                  <td>
                    <p className='overflow-clip overflow-ellipsis text-nowrap'>
                      {subject.id}
                    </p>
                  </td>
                  <td>{subject.name}</td>
                  <td>
                    <p className='overflow-clip overflow-ellipsis text-nowrap'>
                      {subject.description}
                    </p>
                  </td>
                  <td>{subject.created_at?.toString().split('T')[0]}</td>
                  <td className='cursor-pointer text-right'>
                    {!copied ? (
                      <Clipboard
                        onClick={() => {
                          navigator.clipboard.writeText(subject.id);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1000);
                        }}
                      />
                    ) : (
                      <Check />
                    )}
                  </td>
                </tr>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className='mt-10'>
        <h2 className='my-5 text-4xl font-semibold'>Teachings</h2>
        {teachings ? (
          <p>{JSON.stringify(teachings)}</p>
        ) : (
          <p>There are no subjects you currently teach</p>
        )}
        <div className='mt-10'>
          <Button asChild>
            <Link href='/teachings'>Add a teaching</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SearchComponent() {
  return (
    <div className='relative mt-4 inline-block'>
      <input
        type='text'
        placeholder='Search...'
        className='h-10 w-64 rounded-md border border-gray-300 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <Search
        className='pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400'
        size={20}
      />
    </div>
  );
}
