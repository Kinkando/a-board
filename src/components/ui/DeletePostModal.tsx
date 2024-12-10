import { Button, Modal } from 'flowbite-react';
import { useCallback, useContext, useState } from 'react';
import GlobalContext from '@/core/context/global';
import { deletePost } from '@/core/repository/post';

export type EditPostModalProps = {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (postId: string) => void;
};

export default function DeletePostModal({
  postId,
  isOpen,
  onClose,
  onDelete,
}: EditPostModalProps) {
  const { alert } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const removePost = useCallback(async () => {
    try {
      setIsLoading(true);
      await deletePost(postId);
      onDelete(postId);
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
          Please confirm if you wish to delete the post
        </h1>
        <p className="text-center text-[#475467] text-base">
          Are you sure you want to delete the post? Once deleted, it cannot be
          recovered.
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
            onClick={removePost}
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
