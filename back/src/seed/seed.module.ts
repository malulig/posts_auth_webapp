import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedModule],
})
export class SeedModule {}
