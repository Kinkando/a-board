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

export async function updateComment(
  postId: string,
  commentId: string,
  comment: string,
) {
  const { status, error } = await client({
    url: `/post/${postId}/comment/${commentId}`,
    method: 'PATCH',
    data: { comment },
  });
  if (status !== HttpStatusCode.NoContent) {
    throw Error(error);
  }
}

export async function deleteComment(postId: string, commentId: string) {
  const { status, error } = await client({
    url: `/post/${postId}/comment/${commentId}`,
    method: 'DELETE',
  });
  if (status !== HttpStatusCode.NoContent) {
    throw Error(error);
  }
}

export async function createPost(post: {
  title: string;
  content: string;
  communityId: number;
}) {
  const { status, error, data } = await client<{ postId: string }>({
    url: `/post`,
    method: 'POST',
    data: post,
  });
  if (status === HttpStatusCode.Ok) {
    return data.postId;
  }
  throw Error(error);
}

export async function updatePost(post: Post) {
  const { status, error } = await client({
    url: `/post/${post.postId}`,
    method: 'PATCH',
    data: post,
  });
  if (status !== HttpStatusCode.NoContent) {
    throw Error(error);
  }
}

export async function deletePost(postId: string) {
  const { status, error } = await client({
    url: `/post/${postId}`,
    method: 'DELETE',
  });
  if (status !== HttpStatusCode.NoContent) {
    throw Error(error);
  }
}
