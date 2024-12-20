import { User } from '@/core/@types/user';
import client from '@/core/lib/api';
import { HttpStatusCode } from 'axios';

export async function getUser() {
  const { data, status, error } = await client<User>({
    url: '/user',
    method: 'GET',
  });
  if (status === HttpStatusCode.Ok) {
    return data;
  }
  throw Error(error);
}
