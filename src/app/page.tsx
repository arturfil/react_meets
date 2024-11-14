'use client';

import AuthGuard from '@/components/AuthGuard';
import UserCard from '@/components/cards/UserCard';
import FilteredTeacherLayout from '@/components/layouts/FilteredTeacherLayout';

import { useGetTeachers } from '@/hooks/useTeachers';

function HomePage() {
  const { teachers } = useGetTeachers();

  return (
    <div className="container rounded-xl mx-auto mb-10 mt-16 h-full justify-center">
      <h2 className="my-5 text-3xl font-bold">Get tutored now!</h2>

      <FilteredTeacherLayout users={teachers} />
    </div>
  );
}

export default AuthGuard(HomePage);
