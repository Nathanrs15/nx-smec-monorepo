export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
}

export interface IdentityUser {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  roles: string[];
}
