import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'users/user.module';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: false,
          logging: true,
          entities: ['dist/**/*.entity.js'],
        } as TypeOrmModuleAsyncOptions),
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: 'schema.gql',
        installSubscriptionHandlers: true,
        context: ({ req, res, connection }) => ({ req, res, connection }),
      }),
    }),
    ConfigModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
