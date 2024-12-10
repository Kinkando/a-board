import { Button, Modal, Textarea } from 'flowbite-react';
import { Comment, Post } from '@/core/@types/post';
import { useCallback, useContext, useEffect, useState } from 'react';
import GlobalContext from '@/core/context/global';
import { updateComment } from '@/core/repository/post';

export type EditCommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  comment: Comment;
  onEdit: (data: Comment) => void;
};

export default function EditCommentModal({
  isOpen,
  onClose,
  post,
  comment,
  onEdit,
}: EditCommentModalProps) {
  const { alert } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setContent(comment.comment);
    }
  }, [comment, isOpen]);

  const editComment = useCallback(async () => {
    if (!content.trim()) {
      alert({ message: 'Content is required', severity: 'warning' });
      return;
    }
    try {
      setIsLoading(true);
      const data: Comment = {
        ...comment,
        comment: content.trim(),
      };
      await updateComment(post.postId, comment.commentId, content);
      onEdit(data);
      onClose();
    } catch (error) {
      alert({ message: `${error}`, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [post, comment, content]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className="!border-b-0">Add Comments</Modal.Header>
      <Modal.Body>
        <Textarea
          placeholder="What's on your mind..."
          className="focus:border-success focus:ring-success"
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
        ></Textarea>
      </Modal.Body>
      <Modal.Footer className="!border-t-0">
        <div className="flex flex-col gap-[10px] w-full">
          <Button
            color="green"
            className="!ring-0"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="success"
            className="no-border animate button-success"
            onClick={editComment}
            isProcessing={isLoading}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
