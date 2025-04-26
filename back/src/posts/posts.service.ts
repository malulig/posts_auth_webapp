import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}
  create(createPostDto: CreatePostDto, image?: string): Promise<Posts> {
    const post = this.postsRepository.create({ ...createPostDto, image });
    if (!createPostDto.description && !image) {
      throw new BadRequestException(
        'One of "description" or "image" fields must not be empty',
      );
    }
    if (image) {
      post.image = image;
    }
    post.datetime = new Date();

    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOneBy({ id });
  }

  async clear() {
    const posts = await this.postsRepository.find();
    if (posts.length === 0) {
      return;
    }
    await this.postsRepository.remove(posts);
  }

  async createSeed(createPostDto: CreatePostDto): Promise<Posts> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }
}
