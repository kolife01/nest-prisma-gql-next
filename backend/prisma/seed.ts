import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

const postData: Post[] = [
  {
    id: 'fa119cb6-9135-57f5-8a5a-54f28d566d0e',
    contentPath: '/storage/posts/articles/hello.md',
    emoji: '✅',
    excerpt: 'Level 1',
    md5Hash: '5ce6822c5efacf5791b7f46187451e73',
    title: 'Beauty and the Beast',
    thumbNailUrl: 'http://exaample.com/image1.png',
    type: 'article',
    publishDate: new Date('2022-01-31'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '545d5237-15ee-169c-13a2-30f8748e3d6e',
    contentPath: '/storage/posts/articles/graphql.md',
    emoji: '🛳',
    excerpt: 'Level 2',
    md5Hash: 'b7ec2e1a2b1faaed120aeeccb1ffc587',
    title: 'A Dog of Flanders',
    thumbNailUrl: 'http://exaample.com/image2.png',
    type: 'article',
    publishDate: new Date('2022-01-30'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
  {
    id: '95daa18f-90d0-390c-fb96-0d152312936c',
    contentPath: '/storage/posts/articles/nestjs.md',
    emoji: '😼',
    excerpt: 'Level 2',
    md5Hash: 'e5f6dd3adc408b03fbac3faadb82947d',
    title: 'The Little Prince',
    thumbNailUrl: 'http://exaample.com/image3.png',
    type: 'diary',
    publishDate: new Date('2022-01-29'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
];


const doSeed = async () => {
  const posts = [];
  for (const post of postData) {
    const createPosts = prisma.post.create({
      data: post,
    });
    posts.push(createPosts);
  }
  return await prisma.$transaction(posts);
};

async function main() {
  console.log(`Start seeding ...`);
  await doSeed();
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
