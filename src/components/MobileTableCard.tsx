import { RequestType } from '@/interfaces/Request';
import { useRequestStore } from '@/store/requests/requests.store';

interface Props {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  type: RequestType;
  status: string;
}

export default function MobileTableCard({
  id,
  user_id,
  first_name,
  type,
  status,
}: Props) {
  const updateRequest = useRequestStore((state) => state.updateRequest);

  return (
    <div className='m-3 rounded-lg border-[1px] border-gray-500 p-3'>
      <h2>ID: {id}</h2>
      <h2>Name: {first_name}</h2>
      <h2>Type: {type}</h2>
      <h2>Status: {status}</h2>

      <button
        onClick={() =>
          updateRequest({
            id,
            user_id,
            status: 'approved',
            type,
          })
        }
        className='my-2 w-full rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 p-1 text-white hover:bg-green-600 focus:outline-none'
      >
        Approve
      </button>
      <button
        onClick={() =>
          updateRequest({
            id,
            user_id,
            status: 'denied',
            type,
          })
        }
        className='w-full rounded-lg bg-gradient-to-r from-red-400 to-orange-500 p-1 text-white hover:bg-green-600 focus:outline-none'
      >
        Deny
      </button>
    </div>
  );
}
