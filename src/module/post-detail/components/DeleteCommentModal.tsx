import { Button, Modal } from 'flowbite-react';
import { useCallback, useContext, useState } from 'react';
import GlobalContext from '@/core/context/global';
import { deleteComment } from '@/core/repository/post';

export type EditCommentModalProps = {
  postId: string;
  commentId: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (postId: string, commentId: string) => void;
};

export default function DeleteCommentModal({
  postId,
  commentId,
  isOpen,
  onClose,
  onDelete,
}: EditCommentModalProps) {
  const { alert } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const removeComment = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteComment(postId, commentId);
      onDelete(postId, commentId);
      onClose();
    } catch (error) {
      alert({ message: `${error}`, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [postId]);
  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Body>
        <h1 className="text-center font-bold text-black mb-4">
          Please confirm if you wish to delete the comment
        </h1>
        <p className="text-center text-[#475467] text-base">
          Are you sure you want to delete the comment? Once deleted, it cannot
          be recovered.
        </p>
      </Modal.Body>
      <Modal.Footer className="!border-t-0">
        <div className="flex flex-col-reverse gap-[10px] w-full lg:flex-row lg:justify-end">
          <Button
            color="gray"
            className="!ring-0 w-full"
            outline
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="failure"
            className="!ring-0 w-full"
            onClick={removeComment}
            isProcessing={isLoading}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
