import bcrypt from 'bcrypt';
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

function hash(text: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(text, salt);
}

function compare(plain: string, hash: string) {
  return bcrypt.compareSync(plain, hash);
}

export default { hash, compare };
