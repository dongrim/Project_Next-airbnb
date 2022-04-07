import { NextApiRequest, NextApiResponse } from "next";
import { UserType } from '../../../types/user';
import Data from '../../../lib/data';

export default function (req: NextApiRequest, res: NextApiResponse<UserType[]>) {
  if(req.method === "GET") {
    const users = Data.users.getList();
    res.status(200).send(users);
  }
  if(req.method === "POST") {
    const users = Data.users.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    const newUser: UserType = {
      id: userId,
      ...req.body,
    }
    Data.users.addUser([...users ,newUser])
    res.status(200).end();
  }
  res.status(405).end();
}