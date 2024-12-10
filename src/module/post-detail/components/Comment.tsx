import { Avatar } from 'flowbite-react';
import { Comment as CommentModel } from '@/core/@types/post';
import { timeRange } from '@/core/util/date-time';
import { DeleteIcon, EditIcon } from '@/components/icons';

export type CommentProps = {
  comment: CommentModel;
  date: Date;
  onEdit?: (comment: CommentModel) => void;
  onDelete?: (comment: CommentModel) => void;
};

export default function Comment({
  comment,
  date,
  onEdit,
  onDelete,
}: CommentProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Avatar img={comment.userImageUrl} rounded size="md" />
        <div className="flex items-center gap-2 w-[calc(100%-40px-8px)] max-[300px]:flex-col max-[300px]:items-start max-[300px]:gap-0">
          <p className="text-black overflow-hidden break-words text-sm">
            {comment.username}
          </p>
          <p className="text-grey-300 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-[300px]:w-full">
            {timeRange(comment.createdAt, date)}
          </p>
        </div>
        {(comment.editable || comment.deletable) && (
          <div className="ml-auto flex items-center gap-4 stroke-green-300 stroke-[1.5]">
            {comment.editable && (
              <div
                className="cursor-pointer"
                onClick={() => onEdit && onEdit(comment)}
              >
                {EditIcon}
              </div>
            )}
            {comment.deletable && (
              <div
                className="cursor-pointer"
                onClick={() => onDelete && onDelete(comment)}
              >
                {DeleteIcon}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pl-[47px] text-black text-xs">{comment.comment}</div>
    </>
  );
}
