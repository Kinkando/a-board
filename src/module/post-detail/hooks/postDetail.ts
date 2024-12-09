import { useContext, useEffect, useState } from 'react';
import { Comment, PostDetail } from '@/core/@types/post';
import GlobalContext from '@/core/context/global';
import { getPostDetail } from '@/core/repository/post';
import { useRouter } from 'next/navigation';

export function usePostDetail(postId: string) {
  const { alert } = useContext(GlobalContext);
  const [post, setPost] = useState<PostDetail>();
  const [comments, setComments] = useState<Comment[]>([]);
  const { back } = useRouter();

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  const fetchPost = async (postId: string) => {
    try {
      const { post, comments } = await getPostDetail(postId);
      setPost(post);
      setComments(comments);
    } catch (error) {
      back();
      alert({ message: `${error}`, severity: 'error' });
    }
  };

  return {
    fetchPost,
    post,
    comments,
  };
}
