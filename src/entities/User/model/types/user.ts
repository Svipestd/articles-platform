import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string | null;
  currency: Currency | null;
  country: Country | null;
  city: string | null;
  avatar: string | null;
}
