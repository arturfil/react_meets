import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Calendar, Clock, Mail, Star } from 'lucide-react';
import { User } from '@/interfaces/User';
import Link from 'next/link';

interface CardProps {
  user: User;
}

export default function UserCard({ user }: CardProps) {
  return (
    <Card className='w-full max-w-[400px] overflow-hidden border-none bg-gray-100 transition-shadow duration-200 hover:shadow-lg dark:bg-[#191c21] lg:max-w-none'>
      <div className='flex flex-col lg:flex-row'>
        {/* Avatar and Name Section */}
        <CardHeader className='flex-shrink-0 space-y-0 px-6 pt-6 lg:w-64'>
          <div className='flex flex-row items-center gap-4 lg:flex-col'>
            <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 lg:h-20 lg:w-20'>
              <span className='text-2xl font-semibold text-primary lg:text-3xl'>
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
            </div>
            <div className='min-w-0 lg:text-center'>
              <h3 className='truncate text-lg font-semibold lg:text-xl'>
                {user.first_name} {user.last_name}
              </h3>
              <div className='flex items-center text-sm text-muted-foreground lg:justify-center'>
                <Mail className='mr-1 h-4 w-4 flex-shrink-0' />
                <span className='truncate'>{user.email}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Main Content Section */}
        <CardContent className='flex-grow p-6'>
          <div className='space-y-6'>
            {/* Stats Grid */}
            <div className='grid grid-cols-1 gap-3 xl:grid-cols-2'>
              <div className='flex items-center space-x-2 rounded-lg bg-secondary/20 p-3'>
                <Star className='h-5 w-5 flex-shrink-0 text-yellow-500' />
                <span className='whitespace-nowrap text-sm'>
                  4.8/5.0 Rating
                </span>
              </div>
              <div className='flex items-center space-x-2 rounded-lg bg-secondary/20 p-3'>
                <Calendar className='h-5 w-5 flex-shrink-0 text-gray-500' />
                <span className='whitespace-nowrap text-sm'>
                  Available Mon-Fri
                </span>
              </div>
              <div className='flex items-center space-x-2 rounded-lg bg-secondary/20 p-3'>
                <Clock className='h-5 w-5 flex-shrink-0 text-gray-500' />
                <span className='whitespace-nowrap text-sm'>
                  10+ Hours Taught
                </span>
              </div>
            </div>

            {/* Subjects Section */}
            <div>
              <h4 className='mb-3 flex items-center text-sm font-medium'>
                <Book className='mr-2 h-5 w-5' />
                Subjects
              </h4>
              <div className='flex flex-wrap gap-2'>
                <span className='rounded-full bg-primary/10 px-3 py-1 text-sm'>
                  Mathematics
                </span>
                <span className='rounded-full bg-primary/10 px-3 py-1 text-sm'>
                  Physics
                </span>
                <span className='rounded-full bg-primary/10 px-3 py-1 text-sm'>
                  Computer Science
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Action Buttons Section */}
        <CardFooter className='flex flex-col justify-end gap-2 p-6 sm:flex-row lg:w-48 lg:flex-col'>
          <Button asChild variant='outline' className='w-full'>
            <Link href={`/teacher/${user.id}`}>View Profile</Link>
          </Button>
          <Button asChild className='w-full'>
            <a href={`/meetings/createmeeting?teacher=${user.id}`}>Book Now</a>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
