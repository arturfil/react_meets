import { useSubjectStore } from '@/store/subject/subject.store';
import { useEffect } from 'react';

export function useFetchSubjects() {
  const { subjects, categories, getSubjectCategories, getSubjects } =
    useSubjectStore();

  useEffect(() => {
    getSubjectCategories();
    getSubjects();
  }, [getSubjectCategories, getSubjects]);

  return { subjects, categories };
}
