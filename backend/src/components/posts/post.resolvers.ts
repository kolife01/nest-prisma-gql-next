import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { PbEnv } from '@pd-config/environments/pb-env.service';

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(private pbEnv: PbEnv) {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }
  @Query(() => String)
  helloEnv(): string {
    return this.pbEnv.DatabaseUrl;
  }
}
