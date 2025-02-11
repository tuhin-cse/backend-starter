import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { configService } from './config/config.service';

@Module({
  controllers: [AppController],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: configService.getDatabaseUrl(),
      }),
    }),
    AuthModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
