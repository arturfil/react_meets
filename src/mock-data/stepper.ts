interface Category {
  id: string;
  name: string;
  description: string;
}

interface Subject {
  id: string;
  name: string;
  categoryId: string;
  description: string;
}

// Mock data - Categories
export const categories: Category[] = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'All math related subjects',
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Physical and natural sciences',
  },
  {
    id: 'languages',
    name: 'Languages',
    description: 'Foreign language studies',
  },
  {
    id: 'arts',
    name: 'Arts',
    description: 'Visual and performing arts',
  },
  {
    id: 'history',
    name: 'History',
    description: 'World and local history',
  },
  {
    id: 'computer',
    name: 'Computer Science',
    description: 'Programming and computer theory',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Business administration and economics',
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Musical theory and performance',
  },
  {
    id: 'biology',
    name: 'Biology',
    description: 'Life sciences and organisms',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Study of matter and its properties',
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Study of matter and energy',
  },
  {
    id: 'literature',
    name: 'Literature',
    description: 'World literature and writing',
  },
  {
    id: 'psychology',
    name: 'Psychology',
    description: 'Study of human behavior',
  },
  {
    id: 'sociology',
    name: 'Sociology',
    description: 'Study of human society',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Applied sciences and design',
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    description: 'Study of fundamental questions',
  },
  {
    id: 'economics',
    name: 'Economics',
    description: 'Study of resources and markets',
  },
  {
    id: 'geography',
    name: 'Geography',
    description: 'Study of Earth and its features',
  },
];

// Mock data - Subjects
export const subjects: Subject[] = [
  {
    id: 'calc',
    name: 'Calculus',
    categoryId: 'math',
    description: 'Differential and integral calculus',
  },
  {
    id: 'algebra',
    name: 'Algebra',
    categoryId: 'math',
    description: 'Advanced algebraic concepts',
  },
  {
    id: 'physics',
    name: 'Physics',
    categoryId: 'science',
    description: 'Classical and modern physics',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    categoryId: 'science',
    description: 'Organic and inorganic chemistry',
  },
  {
    id: 'english',
    name: 'English',
    categoryId: 'languages',
    description: 'English language and literature',
  },
  {
    id: 'spanish',
    name: 'Spanish',
    categoryId: 'languages',
    description: 'Spanish language studies',
  },
];
