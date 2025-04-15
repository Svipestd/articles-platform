import { User } from '@/entities/User';

export interface Comment {
  id: string;
  text: string;
  likes: string;
  createdAt: string;
  user: User;
}
