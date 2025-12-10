import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { tokenConfig } from 'src/config/token.config';

export const jwtFactory: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [tokenConfig.KEY],
  useFactory: (config: ConfigType<typeof tokenConfig>) => ({
    secret: config.secret,
    signOptions: {
      expiresIn: config.expiresIn as any,
      algorithm: config.algorithm as any,
    },
  }),
};
