import { readFileSync, writeFileSync } from 'fs';
import { UserType } from '../../types/user';

const getList = () => {
  const userString = readFileSync('./data/user.json', 'utf8');
  if (!userString) return [];
  const users: UserType[] = JSON.parse(userString);
  return users;
};

const existEmail = (email) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

const addUser = (data) => {
  writeFileSync('./data/user.json', JSON.stringify(data));
};

const findUser = (email: string) => {
  const users = getList();
  return users.find((user) => user.email === email);
};

export default { getList, existEmail, addUser, findUser };
