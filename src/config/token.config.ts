import { registerAs } from '@nestjs/config';

export const tokenConfigName = 'TOKEN_CONFIG';

export interface TokenConfig {
  secret: string;
  expiresIn: string;
  algorithm?: string;
}

export const tokenConfig = registerAs<TokenConfig>(tokenConfigName, () => ({
  secret: process.env.JWT_SECRET || '',
  expiresIn: process.env.JWT_EXPIRES_IN || '',
  algorithm: process.env.JWT_ALGORITHM || 'HS256',
}));
