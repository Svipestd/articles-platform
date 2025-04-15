import { User } from '@/entities/User';

export interface AuthSchema {
  user: User | null;
  isShowLogin: boolean;
}
