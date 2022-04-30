import { UserType } from './../../../types/user.d';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import Data from '../../../lib/data';
import jwt from 'jsonwebtoken';

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).send('Essential data does not exist.');
      // verify email, 400: Bad Request, 404: Not Found
      const user = Data.users.findUser(email);
      if (!user) return res.status(404).send('Email is wrong.');
      // verify password, 403: Forbidden
      const isPasswordMatched = bcrypt.compareSync(password, user?.password);
      if (!isPasswordMatched) {
        return res.status(403).send('Password is wrong.');
      }
      // jwt code here!
      const generateAccessToken = (user) => {
        // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      };
      const accessToken = generateAccessToken(user);
      const type = 'Bearer';
      const credentials: string = accessToken;
      res.setHeader(
        'Set-Cookie',
        `Authorization=${type} ${credentials}; path=/; max-age=${60 * 60 * 24 * 3}; httponly;`,
      );

      const userWithoutPassword: Partial<Pick<UserType, 'password'>> = user;
      delete userWithoutPassword.password;
      return res.status(200).send(user);
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }
  if (req.method === 'DELETE') {
    try {
      res.setHeader('Set-Cookie', `Authorization=; path=/; max-age=0; httponly;`);
      res.status(204).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  }
  return res.status(405).end();
}
