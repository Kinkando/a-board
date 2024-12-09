import { User } from '@/core/@types/user';
import client from '@/core/lib/api';

export async function getUser() {
  const { data } = await client<User>({
    url: '/user',
    method: 'GET',
  });
  return data;
}
