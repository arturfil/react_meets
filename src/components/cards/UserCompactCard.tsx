import React from 'react';
import { User } from '@/interfaces/User';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface UserCompactCardProps {
  user: User;
}

const UserCompactCard: React.FC<UserCompactCardProps> = ({ user }) => {
  return (
    <Link href={`/teachers/${user.id}`}>
      <Card className='overflow-hidden transition-shadow duration-200 hover:shadow-lg'>
        <div className='relative h-48'>
        </div>
        <div className='p-4'>
          <h3 className='truncate text-lg font-semibold'>
            {user.first_name} {user.last_name}
          </h3>
          {user.roles && user?.roles.map(role => (
            <p key={role} className='truncate text-sm text-gray-500'>{role}</p>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default UserCompactCard;
