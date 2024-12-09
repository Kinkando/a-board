'use client';

import { Avatar, Button } from 'flowbite-react';
import { useParams, useRouter } from 'next/navigation';
import { LeftArrowIcon, MessageIcon } from '@/components/icons';
import { usePostDetail } from '@/module/post-detail/hooks/postDetail';
import { timeRange } from '@/core/util/date-time';

export default function PostDetail() {
  const params = useParams();
  const postId = params.postId as string;
  const { back } = useRouter();
  const { post, comments } = usePostDetail(postId);

  if (!post) {
    return <></>;
  }

  return (
    <div className="lg:absolute lg:left-[280px] lg:py-9 bg-white min-h-[calc(100vh-60px)] min-w-[calc(100vw-280px)]">
      <div className="pt-6 px-4 pb-4 lg:pt-0 lg:px-0 lg:max-w-[calc(100vw-280px-200px)] lg:m-auto">
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

        <Button className="my-6 button-success no-border animate" outline>
          Add Comments
        </Button>

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
