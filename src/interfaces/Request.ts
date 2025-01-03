export type RequestType = 'teach request'| 'create subject request'| 'create category request' | '';
export interface Request {
  id?: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  status?: string;
  type?: RequestType;
  value?: string;
}
