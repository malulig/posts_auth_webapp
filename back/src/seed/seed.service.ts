import { faker } from '@faker-js/faker/locale/ru';
import { Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class SeedService {
  constructor(private postsService: PostsService) {}

  async create() {
    await this.postsService.clear();

    for (let i = 0; i < 20; i++) {
      const post = {
        title: faker.lorem.sentence(3),
        description: faker.lorem.paragraph(1),
        image: null,
        datetime: faker.date.recent({ days: 30 }),
      };
      this.postsService.createSeed(post);
    }
  }
}
