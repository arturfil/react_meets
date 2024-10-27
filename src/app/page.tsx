'use client';

import { useEffect } from 'react';

import AuthGuard from '@/components/AuthGuard';
import SubjectsCategoriesTable from '@/components/tables/SubjectsCategoriesTable';
import SubjectsTable from '@/components/tables/SubjectsTable';

import { useFetchSubjects } from './hooks/useSubjects';

function HomePage() {
  const { subjects, categories } = useFetchSubjects();

  return (
    <div className="container mb-10 mt-16 h-full border-gray-800">
      <h2 className="text-3xl font-bold sm:text-4xl">Get tutored now!</h2>
      <div className="mt-10">
        <SubjectsCategoriesTable categories={categories ?? []} />
      </div>
      <div className="mt-10">
        <SubjectsTable subjects={subjects ?? []} />
      </div>
    </div>
  );
}

export default AuthGuard(HomePage);
