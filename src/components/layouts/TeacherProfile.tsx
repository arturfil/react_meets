import React, { useEffect } from 'react';
import { CircleUser, Clock, NotebookPen, Plus, Trash2 } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import SubjectCard from '@/components/cards/SubjectCard';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth/auth.store';
import { useScheduleStore } from '@/store/schedules/schedule.store';
import { useSubjectStore } from '@/store/subject/subject.store';
import { useTeachingStore } from '@/store/teachings/teachings.store';
import { formatTime } from '@/utils/stringUtils';
import ScheduleDialog from '../modals/ScheduleDialog';
import SubjectDialog from '../modals/SubjectDialog';
import RequestModal from '../modals/RequestModal';
import { useRequestStore } from '@/store/requests/requests.store';
import ScheduleCard from '../cards/ScheduleCard';

const TeacherProfile: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const getSubjects = useSubjectStore((state) => state.getSubjects);
  const setSubjectDialogOpen = useSubjectStore(
    (state) => state.setSubjectDialogOpen,
  );

  const teachings = useTeachingStore((state) => state.teachings);
  const getTeachings = useTeachingStore((state) => state.getTeachings);

  const schedules = useScheduleStore((state) => state.schedules);
  const getSchedules = useScheduleStore((state) => state.getSchedules);
  const setOpType = useScheduleStore(state => state.setOpType);
  const setScheduleDialogOpen = useScheduleStore(
    (state) => state.setScheduleDialogOpen,
  );

  const setRequestDialog = useRequestStore((state) => state.setRequestDialog);


  useEffect(() => {
    if (user?.id) {
      getSchedules(user?.id!);
    }
  }, [user?.id, getSchedules]);

  useEffect(() => {
    getSubjects();
    getTeachings();
  }, [getSubjects, getTeachings]);

  return (
    <div className='container mx-auto rounded-lg border-none bg-gray-200 p-6 dark:bg-[#191c21]'>
      <div className='mb-6 rounded-lg p-6'>
        {/* Profile Header with Image */}
        <div className='mb-8 flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8'>
          <div className='relative h-48 w-48 overflow-hidden rounded-full border-4 border-gray-200 bg-gray-50'>
            <div className='flex h-full w-full items-center justify-center'>
              <CircleUser className='h-32 w-32 text-gray-400' />
            </div>
          </div>

          <div className='flex-1'>
            <h1 className='mb-2 text-3xl font-bold'>
              {user?.first_name} {user?.last_name}
            </h1>
            <p className='mb-4 text-gray-600'>{user?.email}</p>

            <div className='flex flex-wrap gap-2'>
              <Button onClick={() => {
                setScheduleDialogOpen(true);
                setOpType("AddSchedule");
              }}>
                <Clock className='mr-2 h-4 w-4' />
                Add Schedule
              </Button>
              <Button onClick={() => setSubjectDialogOpen(true)}>
                <Plus className='mr-2 h-4 w-4' />
                Add Subjects
              </Button>
              <Button onClick={() => setRequestDialog(true)}>
                <NotebookPen className='mr-2 h-4 w-4' />
                Create Subject Request
              </Button>
            </div>
          </div>
        </div>

        {/* Schedule Display */}
        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold'>Working Hours</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {schedules !== null && schedules?.length > 0 ? (
              schedules?.sort((a, b) => a.day.localeCompare(b.day))
                .map((schedule) => (
                  <ScheduleCard key={schedule.day} schedule={schedule} />
                ))
            ) : (
              <h2>No Schedules created yet</h2>
            )}
          </div>
        </div>
        {/* Teaching Subjects */}
        <div>
          <h2 className='mb-4 text-xl font-semibold'>Teaching Subjects</h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {teachings ? (
              teachings?.map((teaching) => (
                <SubjectCard
                  key={teaching.id}
                  subject={teaching}
                  requireConfirmation={true}
                  icon={<Trash2 className='h-4 w-4 text-red-500' />}
                />
              ))
            ) : (
              <h2>No teachings added yet</h2>
            )}
          </div>
        </div>
      </div>

      <RequestModal />

      {/* Schedule Dialog */}
      <ScheduleDialog />

      {/* Subject Dialog */}
      <SubjectDialog />
    </div>
  );
};

export default AuthGuard(TeacherProfile);
