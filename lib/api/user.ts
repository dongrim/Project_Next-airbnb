import axios from '.';

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  birth: string;
  password: string;
  profileImage: string;
}

// export const addUserAPI = (data) => axios.post('http://localhost:3001/api/users', data);
export const signupAPI = (body:SignUpAPIBody) => axios.post('/api/users', body);  // /api/auth/signup