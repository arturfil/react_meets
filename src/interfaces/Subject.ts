export interface Subject {
  id: string;
  name: string;
  description: string;
  category?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
