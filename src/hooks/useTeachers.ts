import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth/auth.store';

export function useGetTeachers() {
  const { teachers, getTeachers, loading } = useAuthStore();

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  return { teachers, loading };
}
