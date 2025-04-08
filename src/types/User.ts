export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  phone: string;
  address: { city: string; state: string; country: string };
}

export interface UsersResponse {
  total: number;
  users: User[];
  skip: number;
  limit: number;
}

export interface FetchUsersParams {
  limit?: number | string | null;
  skip?: number | string | null;
  select?: string;
}
