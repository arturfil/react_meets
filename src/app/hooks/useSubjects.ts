import { useEffect } from 'react';

import { useSubjectStore } from '@/store/subject/subject.store';

export function useFetchSubjects() {
  const { subjects, categories, getSubjectCategories, getSubjects } =
    useSubjectStore();

  useEffect(() => {
    getSubjectCategories();
    getSubjects();
  }, [getSubjectCategories, getSubjects]);

  return { subjects, categories };
}
