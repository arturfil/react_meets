import React, { FormEvent, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import SubjectCard from '@/components/cards/SubjectCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store/auth/auth.store';
import { useSubjectStore } from '@/store/subject/subject.store';
import { useTeachingStore } from '@/store/teachings/teachings.store';
import { Subject } from '@/interfaces/Subject';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Link from 'next/link';

const SubjectDialog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const user = useAuthStore((state) => state.user);
  const createTeaching = useTeachingStore((state) => state.createTeaching);

  const searchSubjects = useSubjectStore((state) => state.searchSubjects);
  const subjects = useSubjectStore((state) => state.searchedSubjects);
  const isSubjectDialogOpen = useSubjectStore(
    (state) => state.isSubjectDialogOpen,
  );
  const setSubjectDialogOpen = useSubjectStore(
    (state) => state.setSubjectDialogOpen,
  );

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    searchSubjects(searchTerm);
  };

  const handleTeachingCreate = async (subjectId: string, userId: string) => {
    createTeaching({ subject_id: subjectId, teacher_id: userId });
    setSubjectDialogOpen(false);
  };

  return (
    <Dialog open={isSubjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Add Subjects</DialogTitle>
          <DialogDescription>
            Search and select the subjects you want to teach.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSearch} className='my-4 flex gap-2'>
          <Input
            placeholder='Search subjects or categories...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1'
          />
          <Button type='submit'>
            <Search className='mr-2 h-4 w-4' />
            Search
          </Button>
        </form>

        <div className='grid max-h-[400px] gap-4 overflow-y-auto py-4'>
          {subjects?.map((subject: Subject) => (
            <SubjectCard
              requireConfirmation={false}
              key={subject.id}
              subject={subject}
              action={() => handleTeachingCreate(subject.id, user?.id!)}
              icon={<Plus className='h-4 w-4' />}
            />
          ))}
        </div>

        <DialogFooter>
          <Button onClick={() => setSubjectDialogOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;
