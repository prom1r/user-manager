export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  phone: string;
}

export interface FetchUsersParams {
  limit: number;
  select: string;
}
