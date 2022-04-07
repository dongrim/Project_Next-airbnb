import axios from '.';
import { UserType } from '../../types/user';

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  birth: string;
  password: string;
  profileImage: string;
}

export const signupAPI = (body:SignUpAPIBody) =>
  axios.post<UserType>('/api/users', body);
  // axios.post<UserType>('/api/auth/signup', body);