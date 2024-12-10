'use client';

import { Avatar, Button, Modal, Textarea } from 'flowbite-react';
import { useParams, useRouter } from 'next/navigation';
import { LeftArrowIcon, MessageIcon } from '@/components/icons';
import { usePostDetail } from '@/module/post-detail/hooks/postDetail';
import { timeRange } from '@/core/util/date-time';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const params = useParams();
  const postId = params.postId as string;
  const { back, refresh } = useRouter();
  const { post, comments, comment: commentPost } = usePostDetail(postId);

  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Refresh the current route, so the children (and nearby components) will be refreshed
  useEffect(() => {
    const timer = setInterval(() => {
      refresh();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onComment = async (postId: string, comment: string) => {
    setIsLoading(true);
    try {
      await commentPost(postId, comment);
      setComment('');
      setIsComment(false);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const closeComment = () => {
    setIsComment(false);
    setComment('');
  };

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

        <div className="text-black space-y-4">
          <div className="flex items-center gap-2">
            <Avatar img={post.authorImageUrl} rounded size="md" />
            <div className="flex items-center gap-2 w-[calc(100%-40px-8px)] max-[300px]:flex-col max-[300px]:items-start max-[300px]:gap-0">
              <p className="text-black overflow-hidden break-words text-sm">
                {post.authorName}
              </p>
              <p className="text-grey-300 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-[300px]:w-full">
                {timeRange(post.createdAt)}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-[#F3F3F3] px-2 py-1 w-fit text-[#4A4A4A] text-sm">
            {post.communityName}
          </div>
          <div className="font-semibold text-base">
            <p className="post">{post.title}</p>
          </div>
          <div className="text-sm">
            <p className="post">{post.content}</p>
          </div>
          <div className="flex items-center gap-1 text-grey-300 stroke-grey-300">
            {MessageIcon}
            <span className="text-xs font-normal">
              {post.commentCount}{' '}
              {post.commentCount > 0 ? 'Comments' : 'Comment'}
            </span>
          </div>
        </div>

        <Button
          className={
            'my-6 button-success no-border animate' +
            (isComment ? ' lg:hidden' : '')
          }
          outline
          color="success"
          onClick={() => setIsComment(true)}
        >
          Add Comments
        </Button>

        {/* Comment Panel on Desktop Screen */}
        <div
          className={
            'my-6 text-black hidden space-y-3' + (isComment ? ' lg:block' : '')
          }
        >
          <Textarea
            placeholder="What's on your mind..."
            className="focus:border-success focus:ring-success"
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isLoading}
          ></Textarea>
          <div className="flex items-center justify-end gap-3">
            <Button
              color="success"
              className="no-border animate button-success"
              outline
              onClick={closeComment}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              color="success"
              className="no-border animate button-success"
              onClick={() => onComment(postId, comment)}
              isProcessing={isLoading}
              disabled={isLoading}
            >
              Post
            </Button>
          </div>
        </div>

        {/* Comment Panel on Mobile Screen */}
        <Modal
          show={isComment && width < 1024}
          position="center"
          onClose={closeComment}
          className="!h-full"
        >
          <Modal.Header className="!border-b-0">Add Comments</Modal.Header>
          <Modal.Body>
            <Textarea
              placeholder="What's on your mind..."
              className="focus:border-success focus:ring-success"
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isLoading}
            ></Textarea>
          </Modal.Body>
          <Modal.Footer className="!border-t-0">
            <div className="flex flex-col gap-[10px] w-full">
              <Button
                color="success"
                className="no-border animate button-success"
                outline
                onClick={closeComment}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="success"
                className="no-border animate button-success"
                onClick={() => onComment(postId, comment)}
                isProcessing={isLoading}
                disabled={isLoading}
              >
                Post
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.commentId} className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar img={comment.userImageUrl} rounded size="md" />
                <div className="flex items-center gap-2 w-[calc(100%-40px-8px)] max-[300px]:flex-col max-[300px]:items-start max-[300px]:gap-0">
                  <p className="text-black overflow-hidden break-words text-sm">
                    {comment.username}
                  </p>
                  <p className="text-grey-300 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-[300px]:w-full">
                    {timeRange(comment.createdAt)}
                  </p>
                </div>
              </div>

              <div className="pl-[47px] text-black text-xs">
                {comment.comment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
