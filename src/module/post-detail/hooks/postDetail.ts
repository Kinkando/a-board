import { useContext, useEffect, useState } from 'react';
import { Comment, PostDetail } from '@/core/@types/post';
import GlobalContext from '@/core/context/global';
import { createComment, getPostDetail } from '@/core/repository/post';
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

  const comment = async (postId: string, comment: string) => {
    if (!comment.trim()) {
      alert({ message: `Comment must not be empty`, severity: 'warning' });
      throw Error('empty comment');
    }
    try {
      await createComment(postId, comment);
      await fetchPost(postId);
    } catch (error) {
      alert({ message: `${error}`, severity: 'error' });
    }
  };

  return {
    fetchPost,
    post,
    setPost,
    comments,
    setComments,
    comment,
  };
}
