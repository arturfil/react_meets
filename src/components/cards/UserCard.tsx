import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Calendar, Clock, Mail, Star } from 'lucide-react';
import { User } from '@/interfaces/User';
import Link from 'next/link';

interface CardProps {
    user: User
}

export default function UserCard({user}: CardProps) {
  return (
    <Card className="dark:bg-gray-800 w-full max-w-[400px] lg:max-w-none overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row">
        {/* Avatar and Name Section */}
        <CardHeader className="flex-shrink-0 space-y-0 lg:w-64 pt-6 px-6">
          <div className="flex flex-row lg:flex-col items-center gap-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl lg:text-3xl font-semibold text-primary">
                {user.first_name[0]}{user.last_name[0]}
              </span>
            </div>
            <div className="min-w-0 lg:text-center">
              <h3 className="font-semibold text-lg lg:text-xl truncate">
                {user.first_name} {user.last_name}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground lg:justify-center">
                <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Main Content Section */}
        <CardContent className="flex-grow p-6 ">
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2  gap-3">
              <div className="flex items-center space-x-2 bg-secondary/20 rounded-lg p-3">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">4.8/5.0 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-secondary/20 rounded-lg p-3">
                <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">Available Mon-Fri</span>
              </div>
              <div className="flex items-center space-x-2 bg-secondary/20 rounded-lg p-3">
                <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm whitespace-nowrap">10+ Hours Taught</span>
              </div>
            </div>

            {/* Subjects Section */}
            <div>
              <h4 className="font-medium mb-3 flex items-center text-sm">
                <Book className="w-5 h-5 mr-2" />
                Subjects
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                  Mathematics
                </span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                  Physics
                </span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                  Computer Science
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Action Buttons Section */}
        <CardFooter className="flex flex-col sm:flex-row lg:flex-col justify-end gap-2 p-6 lg:w-48">
          <Button 
            asChild 
            variant="outline" 
            className="w-full"
          >
            <Link href={`/teacher/${user.id}`}>
              View Profile
            </Link>
          </Button>
          <Button 
            asChild 
            className="w-full"
          >
            <a href={`/meetings/createmeeting?teacher=${user.id}`}>
              Book Now
            </a>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
