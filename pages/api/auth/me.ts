import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { UserType } from '../../../types/user';

// Authorization: <type> <credentials>

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const accessToken = req.headers?.authorization;
      if (!accessToken) return res.status(401).send('Access token does not exist.');
      const loginUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = Data.users.findUser(loginUser.email);
      if (!user) return res.status(404).send('User not found.');
      const userWithoutPassword: Partial<Pick<UserType, 'password'>> = user;
      delete userWithoutPassword.password;
      res.status(200).send(userWithoutPassword);
    } catch (e) {
      res.status(500).end(e);
    }
  }
  res.status(405).end();
}
