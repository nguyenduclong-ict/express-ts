import { Request, Response, NextFunction } from 'express';
import UserProvider from '@/data/mongo/providers/User.provider';
import jwt from '@/services/auth/token';
import bcrypt from '@/services/auth/bcrypt';
import { FesError } from 'fests';
import * as _ from 'lodash';

export async function handleRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;
    const data = {
      username,
      password: bcrypt.hash(password),
    };

    const user = await UserProvider.createUser(data);
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Register error', error);
    return next(error);
  }
}

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    const user = await UserProvider.getOne({ username });
    if (!user) {
      throw new FesError('Thông tin đăng nhập không chính xác', 401);
    }
    const token = jwt.sync({ username });
    await UserProvider.updateOne(
      {
        username,
      },
      {
        $push: {
          tokens: token,
        },
      }
    );
    return res.json({
      user,
      token,
      success: true,
    });
  } catch (error) {
    console.error('Login error', error);
    return res.status(error.code || 500).json({
      message: error.message,
      data: error.data,
    });
  }
}

export async function handleGetInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = _.get(req, 'user');
  if (!user) {
    return next(new FesError('You not login', 401));
  }
  return res.json(user);
}

export async function handleLogout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = _.get(req, 'user');
  if (!user) {
    return next(new FesError('You not login', 401));
  }
  const token = req.headers.authorization.split('Bearer ').pop();
  await UserProvider.updateOne(
    { username: user.username },
    {
      $pull: {
        tokens: token,
      },
    }
  );
  return res.sendStatus(200);
}

export async function handleLoginWithFacebook(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export async function handleLoginWithGoogle(
  req: Request,
  res: Response,
  next: NextFunction
) {}
