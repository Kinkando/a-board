'use client';

import { Button } from 'flowbite-react';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { LeftArrowIcon } from '@/components/icons';
import GlobalContext from '@/core/context/global';
import { usePostDetail } from '@/module/post-detail/hooks/postDetail';
import Comment from './Comment';
import CommentPanel from './CommentPanel';
import Post from './Post';

const now = new Date();

export default function PostDetail() {
  const params = useParams();
  const postId = params.postId as string;
  const { back } = useRouter();
  const { post, comments, comment: onCommentPost } = usePostDetail(postId);

  const { user } = useContext(GlobalContext);
  const [isComment, setIsComment] = useState(false);

  if (!post) {
    return <></>;
  }

  return (
    <div className="lg:py-9 bg-white min-h-[calc(100vh-60px)]">
      <div className="pt-6 px-4 pb-4 lg:pt-0 w-full lg:m-auto lg:px-40">
        <div
          className="rounded-full bg-green-100 w-11 h-11 stroke-green-500 flex items-center justify-center stroke-2 cursor-pointer mb-10"
          onClick={back}
        >
          {LeftArrowIcon}
        </div>

        <Post post={post} date={now} />

        <Button
          className={
            'my-6 button-success no-border animate' +
            (isComment ? ' lg:hidden' : '')
          }
          outline
          color="success"
          onClick={() => setIsComment(true)}
          disabled={!user}
        >
          Add Comments
        </Button>

        <CommentPanel
          onCloseComment={() => setIsComment(false)}
          isComment={isComment}
          postId={postId}
          onSubmit={() => setIsComment(false)}
          onCommentPost={onCommentPost}
          commentable={!!user}
        />

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.commentId} className="space-y-2">
              <Comment comment={comment} date={now} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
