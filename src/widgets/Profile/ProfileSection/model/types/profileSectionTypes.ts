import { User } from '@/entities/User';
import { FormMode } from '@/shared/types/common';

export interface ProfileSectionSchema {
  isLoading: boolean;
  error: string | null;
  formMode: FormMode;
  profile: User | null;
}
