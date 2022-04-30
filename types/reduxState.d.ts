import { UserType } from './user';

export type UserState = UserType & {
  isLogged: boolean;
};

export type CommonState = {
  validateMode: boolean;
};

export type AuthState = {
  authModalMode: 'signup' | 'login';
};
