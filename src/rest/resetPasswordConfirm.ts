import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { redis } from '../redis';

import { User } from '../entity/User';

export const resetPasswordConfirm = async (req: Request, res: Response) => {
  const resetPasswordToken = req.params.resetPasswordToken;
  const newPassword = req.body.newPassword;
  const userId = await redis.get(resetPasswordToken);

  if (userId && newPassword) {
    const hashPassword = bcrypt.hashSync(newPassword, 12);

    await User.update({ id: parseInt(userId) }, { password: hashPassword });

    redis.del(resetPasswordToken);

    return res.redirect(process.env.REACT_APP as string);
  } else {
    return res.send('Something went wrong');
  }
};
