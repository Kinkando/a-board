import { HttpStatusCode } from 'axios';
import { Comment, FilterPost, Post, PostDetail } from '@/core/@types/post';
import client from '@/core/lib/api';

export async function listPosts(params: FilterPost) {
  const { data, status, error } = await client<Post[]>({
    url: '/post',
    method: 'GET',
    params,
    signalID: 'LIST_POSTS',
  });
  if (status === HttpStatusCode.Ok) {
    return data;
  }
  throw Error(error);
}

export async function getPostDetail(postId: string) {
  const { data, status, error } = await client<{
    post: PostDetail;
    comments: Comment[];
  }>({
    url: `/post/${postId}`,
    method: 'GET',
  });
  if (status === HttpStatusCode.Ok) {
    return data;
  }
  throw Error(error);
}

export async function createComment(postId: string, comment: string) {
  const { data, status, error } = await client<{
    post: PostDetail;
    comments: Comment[];
  }>({
    url: `/post/${postId}/comment`,
    method: 'POST',
    data: { comment },
  });
  if (status === HttpStatusCode.Ok) {
    return data;
  }
  throw Error(error);
}
