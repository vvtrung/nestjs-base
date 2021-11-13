import { randomBytes } from 'crypto';

export const generateToken = (byteSize = 64) => {
  return randomBytes(byteSize).toString('base64');
};
