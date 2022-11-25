export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  isLoggedIn: string;
  favorite: string[];
  authToken: string;
  phoneNumber?: string;
}

export interface EMPTY_RESPONSE {}
