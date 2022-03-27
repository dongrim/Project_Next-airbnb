import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

const getList = () => {
  const userString = readFileSync('./data/user.json', 'utf8');
  if (!userString) return [];
  const users: StoredUserType[] = JSON.parse(userString);
  return users;
}

const existEmail = (email) => {
  const users = getList();
  return users.some(user => user.email === email);
}

const addUser = (data) => {
  writeFileSync('./data/user.json', JSON.stringify(data));
}

export default { getList, existEmail, addUser };