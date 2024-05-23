interface Props {
  user_id: string;
  fullname: string;
  status: string;
}

export default function RequestCard({fullname, user_id, status }: Props) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {fullname}
        </th>
        <td className="px-6 py-4">{user_id}</td>
        <td className="px-6 py-4">{status}</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>
    </>
  );
}
