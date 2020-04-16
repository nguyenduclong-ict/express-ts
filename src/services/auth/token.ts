import jwt, { TokenExpiredError } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const optionsDefault: jwt.SignOptions = {
  expiresIn: Number(process.env.JWT_EXPIRES_IN) || '7d',
};

function sync(payload: string | object | Buffer, options?: jwt.SignOptions) {
  options = {
    ...optionsDefault,
    ...options,
  };
  return jwt.sign(payload, secret, options);
}

function verify(token: string, options?: jwt.VerifyOptions) {
  return jwt.verify(token, secret, options);
}

export default { sync, verify };
