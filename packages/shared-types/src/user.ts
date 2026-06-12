export type UserStatus = 'active' | 'inactive';

export type User = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type Role = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Permission = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
