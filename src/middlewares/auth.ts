import { NextFunction, Response, Request } from 'express';
import * as _ from 'lodash';
import jwt from '@/services/auth/token';
import UserProvider from '@/data/mongo/providers/User.provider';
import { FesError } from 'fests';

export function authMiddleware(rule?: CheckOptions) {
  return async function handle(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user =
      _.get(req, 'user') || (await getUser(req.headers.authorization));
    _.set(req, 'user', user);

    const { and, or, not } = rule || {};
    if (and || or || not) {
      if (!user) {
        return next(new FesError('Login required:' + and.join(','), 401));
      }
      const userRoles: any[] = user.roles || [];
      if (and && and.some((role) => !userRoles.find((r) => r.id === role))) {
        return next(
          new FesError('User must have all roles: ' + and.join(','), 403)
        );
      }

      if (or && or.every((role) => !userRoles.find((r) => r.id === role))) {
        return next(
          new FesError('User must have at least on role: ' + and.join(','), 403)
        );
      }

      if (not && not.some((role) => userRoles.find((r) => r.id === role))) {
        return next(
          new FesError('User must not have role: ' + and.join(','), 403)
        );
      }
    }

    next();
  };
}

interface CheckOptions {
  and?: string[];
  or?: string[];
  not?: string[];
}

async function getUser(authorization = '') {
  const token = authorization.split('Bearer ').pop();
  if (token) {
    const tokenData: any = jwt.verify(token);
    const user = await UserProvider.getOne(
      {
        username: tokenData.username,
        tokens: token,
      },
      ['roles']
    );
    return user;
  }
  return null;
}
