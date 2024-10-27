'use client';

import React, { useEffect } from 'react';

import AuthGuard from '@/components/AuthGuard';
import MobileTableCard from '@/components/MobileTableCard';
import RequestCard from '@/components/RequestCard';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useRequestStore } from '@/store/requests/requests.store';

import { Request } from '@/interfaces/Request';

function Requests() {
  const requests = useRequestStore((state) => state.requests);
  const getAllRequests = useRequestStore((state) => state.getAllRequests);

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  return (
    <div className="container mx-auto mb-10 mt-16 h-full justify-center">
      <div className="flex">
        <h2 className="my-5 justify-center text-center text-3xl font-bold">
          Teacher Requests
        </h2>
      </div>
      {requests ? (
        <RequestsTable requests={requests} />
      ) : (
        <h2 className="my-5 text-xl font-bold">
          Server Trying to reach requests
        </h2>
      )}
    </div>
  );
}

interface TableProps {
  requests: Request[];
}

function RequestsTable({ requests }: TableProps) {
  return (
    <div className="">
      <Table className="max-sm:hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="">User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Approve</TableHead>
            <TableHead className="text-right">Deny</TableHead>
            <TableHead className="">Copy ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              {...request}
            />
          ))}
        </TableBody>
      </Table>
      <div className="mx-auto grid w-full grid-cols-1 place-items-center justify-center sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        {requests.map((request) => (
          <MobileTableCard
            key={request.id}
            {...request}
          />
        ))}
      </div>
    </div>
  );
}

export default AuthGuard(Requests);
