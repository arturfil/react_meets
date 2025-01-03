import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import UserCard from '@/components/cards/UserCard';
import { Button } from '@/components/ui/button';
import { User } from '@/interfaces/User';
import FiltersMenu from './FiltersMenu';

interface FilteredTeacherLayoutProps {
  users?: User[];
}

const FilteredTeacherLayout: React.FC<FilteredTeacherLayoutProps> = ({
  users,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!users)
    return (
      <h2>Couldn&apos;t fetch the users fromt the server, try again later</h2>
    );

  return (
    <div className='relative min-h-screen rounded-md'>
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
          onClick={toggleSidebar}
        />
      )}

      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col lg:flex-row lg:gap-8'>
          {/* Sidebar */}

          <FiltersMenu
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          {/* Main Content */}
          <main className='flex-1 px-4 py-6 lg:px-6'>
            {/* Mobile Filter Button */}
            <div className='sticky top-0 z-10 mb-6 flex items-center justify-between py-2 lg:hidden'>
              <h1 className='text-xl font-semibold'>Teachers</h1>
              <Button
                onClick={toggleSidebar}
                variant='outline'
                size='sm'
                className='flex items-center gap-2'
              >
                <SlidersHorizontal className='h-4 w-4' />
                Filters
              </Button>
            </div>

            <div className='space-y-4'>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FilteredTeacherLayout;
