import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from '@pd-components/posts/posts.module';
import { PbEnvModule } from '@pd-config/environments/pb-env.module';
import { PbEnv } from '@pd-config/environments/pb-env.service';
import { WinstonModule } from 'nest-winston';
import { PrismaModule } from '@pd-components/prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    WinstonModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [PbEnv],
      isGlobal: true,
      useFactory: (env: PbEnv) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
    PostsModule,
    PbEnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
