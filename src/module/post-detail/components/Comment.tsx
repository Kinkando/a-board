import { Avatar } from 'flowbite-react';
import { Comment as CommentModel } from '@/core/@types/post';
import { timeRange } from '@/core/util/date-time';

export type CommentProps = {
  comment: CommentModel;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <>
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

      <div className="pl-[47px] text-black text-xs">{comment.comment}</div>
    </>
  );
}
