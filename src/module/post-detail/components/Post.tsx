import { Avatar } from 'flowbite-react';
import { MessageIcon } from '@/components/icons';
import { Post as PostModel } from '@/core/@types/post';
import { timeRange } from '@/core/util/date-time';

export type PostProps = {
  post: PostModel;
};

export default function Post({ post }: PostProps) {
  return (
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
          {post.commentCount} {post.commentCount > 0 ? 'Comments' : 'Comment'}
        </span>
      </div>
    </div>
  );
}
