import React from 'react';
import { useTeachingStore } from '@/store/teachings/teachings.store';
import { Subject } from '@/interfaces/Subject';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

interface Props {
  subject: Subject;
  action?: (subjectId: string) => void;
  requireConfirmation: boolean;
  icon: any;
}

export default function SubjectCard({
  requireConfirmation,
  subject,
  action,
  icon,
}: Props) {
  return (
    <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-[#383d44]'>
      <div>
        <h3 className='font-medium'>{subject.name}</h3>
        <p className='text-sm text-gray-400'>{subject.description}</p>
        <p className='text-sm italic text-gray-500'>{subject.category}</p>
      </div>

      {requireConfirmation && (
        <ConfirmDialog icon={icon} subjectId={subject.id} />
      )}

      {action && (
        <Button
          className='bg-white dark:bg-gray-800'
          variant={'outline'}
          onClick={() => action(subject.id)}
        >
          {icon}
        </Button>
      )}
    </div>
  );
}

interface ConfirmDialogProps {
  icon: any;
  subjectId: string;
}

const ConfirmDialog = ({ icon, subjectId }: ConfirmDialogProps) => {
  const deleteTeaching = useTeachingStore((state) => state.deleteTeaching);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-gray-100 dark:bg-[#383d44]'>{icon}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete the subject
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteTeaching(subjectId)}
            className='bg-red-500 hover:bg-red-600 focus:ring-red-500'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
