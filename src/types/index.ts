export interface Question {
    id: string;
    type: 'text' | 'checkbox' | 'grid';
    title: string;
    required: boolean;
    options?: string[];
    rows?: string[];
    columns?: string[];
  }
  
  export interface Form {
    _id?: string;
    title: string;
    description?: string;
    headerImage?: string;
    questions: Question[];
    createdBy?: string;
    createdAt?: Date;
  }
  
  export interface User {
    _id: string;
    email: string;
    name: string;
    token: string;
  }