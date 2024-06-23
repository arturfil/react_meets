import { useRequestStore } from "@/store/requests/requests.store";

interface Props {
  user_id: string;
  fullname: string;
  status: string;
}

export default function RequestCard({ fullname, user_id, status }: Props) {
  const updateRequest = useRequestStore(state => state.updateRequest);


  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-100 dark:border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-500"
        >
          {fullname}
        </th>
        <td className="px-6 py-4">{user_id}</td>
        <td className="px-6 py-4">{status}</td>
        <td className="px-6 py-4 text-right">
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
        </td>
        <td className="px-6 py-4 text-right">
          <button
            onClick={() => updateRequest({id: user_id, status: "denied"})}
            className="
            w-full bg-gradient-to-r 
            from-red-400 to-orange-500 
            text-white p-1 rounded-lg 
            hover:bg-green-600 focus:outline-none"
          >
            Deny
          </button>
        </td>
      </tr>
    </>
  );
}
