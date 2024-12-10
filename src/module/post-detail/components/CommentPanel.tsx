import { Button, Modal, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';

export type CommentPanelProps = {
  postId: string;
  isComment: boolean;
  onCloseComment: () => void;
  onCommentPost: (postId: string, comment: string) => Promise<void>;
  onSubmit: (comment: string) => void;
  commentable?: boolean;
};

export default function CommentPanel({
  postId,
  isComment,
  onCloseComment,
  onCommentPost,
  onSubmit,
  commentable,
}: CommentPanelProps) {
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

  const onComment = async (postId: string, comment: string) => {
    setIsLoading(true);
    try {
      await onCommentPost(postId, comment);
      setComment('');
      onSubmit(comment);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const closeComment = () => {
    onCloseComment();
    setComment('');
  };

  return (
    <>
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
          disabled={isLoading || !commentable}
        ></Textarea>
        <div className="flex items-center justify-end gap-3">
          <Button
            color="success"
            className="no-border animate button-success"
            outline
            onClick={closeComment}
            disabled={isLoading || !commentable}
          >
            Cancel
          </Button>
          <Button
            color="success"
            className="no-border animate button-success"
            onClick={() => onComment(postId, comment)}
            isProcessing={isLoading}
            disabled={isLoading || !commentable}
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
            disabled={isLoading || !commentable}
          ></Textarea>
        </Modal.Body>
        <Modal.Footer className="!border-t-0">
          <div className="flex flex-col gap-[10px] w-full">
            <Button
              color="success"
              className="no-border animate button-success"
              outline
              onClick={closeComment}
              disabled={isLoading || !commentable}
            >
              Cancel
            </Button>
            <Button
              color="success"
              className="no-border animate button-success"
              onClick={() => onComment(postId, comment)}
              isProcessing={isLoading}
              disabled={isLoading || !commentable}
            >
              Post
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
