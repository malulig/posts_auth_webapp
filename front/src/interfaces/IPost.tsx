export interface IPost {
  id: number;
  title: string;
  description: string | null;
  image: string | null;
  datetime: Date;
}
