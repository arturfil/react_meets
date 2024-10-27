export interface Meeting {
  id: string;
  subject_id: string;
  teacher_id: string;
  student_id: string;
  student_attended: string;
  start_time: string;
  end_time: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface MeetingSubmission {
  student_id: string;
  subject_id: string;
  teacher_id: string;
  start_time: string;
  end_time: string;
}

export interface MeetingResponse {
  id: string;
  subject: string;
  teacher: string;
  student: string;
  student_attended: string;
  start_time: string;
  end_time: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
