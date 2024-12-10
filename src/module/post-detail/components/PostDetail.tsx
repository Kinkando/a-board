'use client';

import { Button } from 'flowbite-react';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { LeftArrowIcon } from '@/components/icons';
import { Comment } from '@/core/@types/post';
import GlobalContext from '@/core/context/global';
import { usePostDetail } from '@/module/post-detail/hooks/postDetail';
import CommentComponent from './Comment';
import CommentPanel from './CommentPanel';
import Post from './Post';
import EditCommentModal from './EditCommentModal';
import DeleteCommentModal from './DeleteCommentModal';

const now = new Date();

export default function PostDetail() {
  const params = useParams();
  const postId = params.postId as string;
  const { back } = useRouter();
  const {
    post,
    comments,
    setComments,
    comment: onCommentPost,
  } = usePostDetail(postId);

  const { user } = useContext(GlobalContext);
  const [isComment, setIsComment] = useState(false);

  const [openModal, setOpenModal] = useState<'edit' | 'delete' | 'closed'>(
    'closed',
  );
  const [selectedComment, setSelectedComment] = useState<Comment>();

  const selectComment = (comment: Comment, event: 'edit' | 'delete') => {
    setSelectedComment(comment);
    setOpenModal(event);
  };

  const onEdit = (data: Comment) => {
    setSelectedComment(undefined);
    setComments((comments) =>
      comments.map((comment) =>
        comment.commentId === data.commentId
          ? { ...comment, ...data }
          : comment,
      ),
    );
  };

  const onDelete = (_: string, commentId: string) => {
    setSelectedComment(undefined);
    setComments((comments) =>
      comments.filter((comment) => comment.commentId !== commentId),
    );
  };

  if (!post) {
    document.title = 'Post Detail | a Board';
    return <></>;
  } else {
    document.title = `${post.title} | Post | a Board`;
  }

  return (
    <>
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
            className={'my-6 !ring-0' + (isComment ? ' lg:hidden' : '')}
            color="green"
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
                <CommentComponent
                  comment={comment}
                  date={now}
                  onEdit={(comment) => selectComment(comment, 'edit')}
                  onDelete={(comment) => selectComment(comment, 'delete')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedComment && (
        <>
          <EditCommentModal
            isOpen={openModal === 'edit'}
            onClose={() => setOpenModal('closed')}
            onEdit={onEdit}
            post={post}
            comment={selectedComment}
          />
          <DeleteCommentModal
            isOpen={openModal === 'delete'}
            onClose={() => setOpenModal('closed')}
            onDelete={onDelete}
            postId={post.postId}
            commentId={selectedComment.commentId}
          />
        </>
      )}
    </>
  );
}
