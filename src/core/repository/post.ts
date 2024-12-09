import { HttpStatusCode } from 'axios';
import { FilterPost, Post } from '@/core/@types/post';
import client from '@/core/lib/api';

export async function listPosts(params: FilterPost) {
  const { data, status, error } = await client<Post[]>({
    url: '/post',
    method: 'GET',
    params,
  });
  if (status === HttpStatusCode.Ok) {
    return data;
  }
  throw Error(error);
}
