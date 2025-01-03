'use client';

import AuthGuard from '@/components/AuthGuard';
import FilteredTeacherLayout from '@/components/layouts/FilteredTeacherLayout';
import Spinner from '@/components/spinners/Spinner';

import { useGetTeachers } from '@/hooks/useTeachers';

function HomePage() {
  const { loading, teachers } = useGetTeachers();

  if (loading) return <Spinner size='md' color='primary' />;

  return (
    <div className='container mx-auto mb-10 mt-16 h-full justify-center rounded-xl'>
      <h2 className='my-5 text-3xl font-bold'>Get tutored now!</h2>
      <FilteredTeacherLayout users={teachers} />
    </div>
  );
}

export default AuthGuard(HomePage);
