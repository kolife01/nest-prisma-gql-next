import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from '@pd-components/posts/posts.module';
import { PbEnvModule } from '@pd-config/environments/pb-env.module';
import { PbEnv } from '@pd-config/environments/pb-env.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    PostsModule,
    PbEnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
