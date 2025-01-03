export interface Schedule {
  user_id: string;
  start_time: string;
  end_time: string;
  day: WeekDay | '';
  created_at?: string;
  updated_at?: string;
}

export interface TimeSchedule {
  start: string;
  end: string;
  enabled: boolean;
}

export type ScheduleUpdateField = 'start' | 'end' | 'enabled';
export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday';

export interface ScheduleDay {
  monday: TimeSchedule;
  tuesday: TimeSchedule;
  wednesday: TimeSchedule;
  thursday: TimeSchedule;
  friday: TimeSchedule;
  [key: string]: TimeSchedule; // Index signature for dynamic access
}
