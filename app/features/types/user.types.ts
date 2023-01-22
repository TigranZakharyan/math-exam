export type Login = {
  email: string;
  password: string;
}

export type Registration = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserState = {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  updatedAt: Date | undefined;
  lastLogin: Date | undefined;
  createdAt: Date | undefined;
}
