"use client";

import AuthGuard from "@/components/AuthGuard";
import { useRequestStore } from "@/store/requests/requests.store";
import RequestCard from "@/components/RequestCard";
import React, { useEffect } from "react";
import { Request } from "@/interfaces/Request";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Requests() {
  const requests = useRequestStore((state) => state.requests);
  const getAllRequests = useRequestStore((state) => state.getAllRequests);

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  return (
    <div className="mt-16">
      <h2 className="font-bold text-5xl my-5">Teacher Requests</h2>
      {requests ? (
        <RequestsTable requests={requests} />
      ) : (
        <h2 className="font-bold text-xl my-5">
          Server Trying to reach requests
        </h2>
      )}
    </div>
  );
}

interface TableProps {
  requests: Request[];
}

export function RequestsTable({ requests }: TableProps) {
  return (
    <div className="flex mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="">User</TableHead>
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
              user_id={request.id}
              status={request.status}
              fullname={`${request.first_name} ${request.last_name}`}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AuthGuard(Requests);
