import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import { DeleteIcon, EditIcon, MessageIcon } from '@/components/icons';
import { Post } from '@/core/@types/post';

export type PostProps = {
  post: Post;
  isAuthor?: boolean;
};

export default function PostCard({ post, isAuthor }: PostProps) {
  return (
    <div className="p-5 text-black">
      <div className="flex items-center gap-2 mb-4">
        <Avatar img={post.authorImageUrl} rounded />
        <span className="text-grey-300 text-ellipsis whitespace-nowrap overflow-hidden">
          {post.authorName}
        </span>

        {isAuthor && (
          <div className="ml-auto flex items-center gap-4 stroke-green-300 stroke-[1.5]">
            <div className="cursor-pointer">{EditIcon}</div>
            <div className="cursor-pointer">{DeleteIcon}</div>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-[#F3F3F3] px-2 py-1 w-fit text-[#4A4A4A] text-sm mb-1">
        {post.communityName}
      </div>

      {isAuthor && (
        <Link href={`/post/${post.postId}`}>
          <div className="font-semibold text-base line-clamp-1">
            <p className="post">{post.title}</p>
          </div>
        </Link>
      )}

      {!isAuthor && (
        <div className="font-semibold text-base line-clamp-1">
          <p className="post">{post.title}</p>
        </div>
      )}

      <div className="text-sm line-clamp-2 mb-[10px]">
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
