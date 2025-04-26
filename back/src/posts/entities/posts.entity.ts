import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('varchar', { nullable: true })
  image: string | null;

  @Column('datetime')
  datetime: Date;
}
