import axios from '.';
import { UserType } from '../../types/user';

export const meAPI = () => axios.get<UserType>('/api/auth/me');
