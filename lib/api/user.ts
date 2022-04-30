import axios from '.';
import { UserType } from '../../types/user';

type SignUpAPIBody = Omit<UserType, 'id'>;
type LoginAPIBody = Pick<UserType, 'email' | 'password'>;

// export const signupAPI = async (body: SignUpAPIBody): Promise<any> =>
//   await axios.post<UserType>('/api/users', body);
export const signupAPI = (body: SignUpAPIBody) => axios.post<UserType>('/api/users', body);

export const loginAPI = (body: LoginAPIBody) => {
  return axios.post<UserType>('/api/auth/login', body);
};

export const logoutAPI = () => axios.delete('/api/auth/login');
