export type User = {
  userId?: string;
  username: string;
  fullName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  fullName: string;
  email: string;
  password: string;
};
