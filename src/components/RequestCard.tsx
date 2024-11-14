import { useState } from 'react';

import { Check, Clipboard } from 'lucide-react';

import { useRequestStore } from '@/store/requests/requests.store';

import { TableCell, TableRow } from './ui/table';
import { Button } from './ui/button';

interface Props {
  id: string;
  first_name?: string;
  last_name?: string;
  type: string;
  status: string;
}

export default function RequestCard({ id, first_name, type, status }: Props) {
  const updateRequest = useRequestStore((state) => state.updateRequest);
  const [copied, setCopied] = useState(false);

  return (
    <>
      <TableRow key={id}>
        <TableCell className="font-medium">
          <p className="w-[100px] overflow-clip overflow-ellipsis text-nowrap">
            {id}
          </p>
        </TableCell>
        <TableCell>{first_name}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell className="text-right">
          <Button
            onClick={() =>
              updateRequest({
                id,
                status: 'approved',
                type,
              })
            }
          >
            Approve
          </Button>
        </TableCell>
        <TableCell className="text-right">
          <Button
            variant="outline"
            onClick={() =>
              updateRequest({
                id,
                status: 'denied',
                type,
              })
            }
          >
            Deny
          </Button>
        </TableCell>
        <TableCell className="cursor-pointer text-right">
          {!copied ? (
            <Clipboard
              onClick={() => {
                navigator.clipboard.writeText(id);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            />
          ) : (
            <Check />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
