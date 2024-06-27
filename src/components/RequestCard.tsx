import { useRequestStore } from "@/store/requests/requests.store";
import { TableCell, TableRow } from "./ui/table";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

interface Props {
  user_id: string;
  fullname: string;
  status: string;
}

export default function RequestCard({ fullname, user_id, status }: Props) {
  const updateRequest = useRequestStore((state) => state.updateRequest);
  const [copied, setCopied] = useState(false);

  return (
    <>
      <TableRow key={user_id}>
        <TableCell className="font-medium">
          <p className="w-[100px] overflow-clip overflow-ellipsis text-nowrap">
            {user_id}
          </p>
        </TableCell>
        <TableCell>{fullname}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell className="text-right">
          <button
            onClick={() => updateRequest({id: user_id, status: "approved"})}
            className="
            w-full bg-gradient-to-r 
            from-green-400 to-emerald-500 
            text-white p-1 rounded-lg 
            hover:bg-green-600 focus:outline-none"
          >
            Approve
          </button>
        </TableCell>
        <TableCell className="text-right">
          <button
            onClick={() => updateRequest({ id: user_id, status: "denied" })}
            className="
            w-full bg-gradient-to-r 
            from-red-400 to-orange-500 
            text-white p-1 rounded-lg 
            hover:bg-green-600 focus:outline-none"
          >
            Deny
          </button>
        </TableCell>
        <TableCell className="cursor-pointer text-right">
          {!copied ? (
            <Clipboard onClick={() => {
              navigator.clipboard.writeText(user_id)
              setCopied(true)
              setTimeout(() => {
                setCopied(false);
              }, 1000)
            }} />
          ): (
            <Check />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
