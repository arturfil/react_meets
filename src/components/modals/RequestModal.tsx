import React, { FormEvent, useState } from 'react';
import CustomDialog from '../custom/CustomDialog';
import { useRequestStore } from '@/store/requests/requests.store';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/auth/auth.store';

export default function RequestModal() {
  const requests:SubjectCategoryType[] = ['create subject request', 'create category request'];

  const user = useAuthStore(state => state.user);

  const requestDialog = useRequestStore((state) => state.requestDialog);
  const setRequestDialog = useRequestStore((state) => state.setRequestDialog);
  const createRequest = useRequestStore((state) => state.createRequest);

  type SubjectCategoryType = 'create subject request'| 'create category request' | '';
  const [requestType, setRequestType] = useState<SubjectCategoryType>('');
  const [value, setValue] = useState('');


  function submitRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (requestType === '') return;
    if (!user?.id || !user) return;
    createRequest({user_id: user?.id, type: requestType, value });
  }

  return (
    <CustomDialog isOpen={requestDialog} onOpenChange={setRequestDialog}>
      <div>
        <label htmlFor='course_name'>Select Request Type</label>
        <select
          onChange={(e) => setRequestType(e.target.value as SubjectCategoryType)}
          className='w-full rounded-md border-2 border-gray-300 p-2 dark:bg-[#191c21]'
          defaultValue={'default'}
          name=''
          id=''
        >
          <option disabled value='default'>
            Type of request
          </option>
          {requests.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={submitRequest}>
        <div className='mb-4'>
          <label htmlFor='course_name'>
            Name of{' '}
            {requestType === 'create subject request' ? 'Subject' : 'Category'}{' '}
          </label>
          <Input name="value" value={value} onChange={e => setValue(e.target.value)} placeholder='Enter value here' />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </CustomDialog>
  );
}
