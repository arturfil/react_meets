import { useRequestStore } from "@/store/requests/requests.store";

interface Props {
  id: string;
  first_name?: string;
  last_name?: string;
  type: string;
  status: string;
}

export default function MobileTableCard({
  id,
  first_name,
  type,
  status,
}: Props) {
  const updateRequest = useRequestStore((state) => state.updateRequest);

  return (
    <div className="border-[1px] border-gray-500 m-3 p-3 rounded-lg">
      <h2>ID: {id}</h2>
      <h2>Name: {first_name}</h2>
      <h2>Type: {type}</h2>
      <h2>Status: {status}</h2>

      <button
        onClick={() => updateRequest({ id, status: "approved", type })}
        className="
            my-2 w-full bg-gradient-to-r 
            from-green-400 to-emerald-500 
            text-white p-1 rounded-lg 
            hover:bg-green-600 focus:outline-none"
      >
        Approve
      </button>
      <button
        onClick={() => updateRequest({ id, status: "denied", type })}
        className="
            w-full bg-gradient-to-r 
            from-red-400 to-orange-500 
            text-white p-1 rounded-lg 
            hover:bg-green-600 focus:outline-none"
      >
        Deny
      </button>
    </div>
  );
}
