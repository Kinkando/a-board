import { HttpStatusCode } from 'axios';
import { Community } from '@/core/@types/community';
import client from '@/core/lib/api';

export async function getCommunities() {
  const { data, status, error } = await client<Community[]>({
    url: '/community',
    method: 'GET',
  });
  if (status === HttpStatusCode.Ok) {
    return data;
  }
  throw Error(error);
}
