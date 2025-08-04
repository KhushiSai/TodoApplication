export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoFormData {
  title: string;
  completed: boolean;
}

export interface ApiResponse {
  success: boolean;
  data?: Todo | Todo[];
  error?: string;
} 