import { Button, Modal, Textarea, TextInput } from 'flowbite-react';
import CommunityDropdown from './CommunityDropdown';
import { Community } from '@/core/@types/community';
import { Post } from '@/core/@types/post';
import { useCallback, useContext, useEffect, useState } from 'react';
import GlobalContext from '@/core/context/global';
import { updatePost } from '@/core/repository/post';

export type EditPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  communities: Community[];
  post: Post;
  onEdit: (data: Post) => void;
};

export default function EditPostModal({
  isOpen,
  onClose,
  communities,
  post,
  onEdit,
}: EditPostModalProps) {
  const { alert } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [community, setCommunity] = useState<Community>({
    id: post.communityId,
    name: post.communityName,
  });

  useEffect(() => {
    if (isOpen) {
      setCommunity({ id: post.communityId, name: post.communityName });
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post, isOpen]);

  const edit = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: Post = {
        ...post,
        title,
        content,
        communityId: community.id,
        communityName: community.name,
      };
      await updatePost(data);
      onEdit(data);
      onClose();
    } catch (error) {
      alert({ message: `${error}`, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [post, title, content, community]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className="!border-b-0">Edit Post</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="text-success w-full rounded-lg h-10 border-success">
            <CommunityDropdown
              communities={communities}
              onSelectCommunity={setCommunity}
              community={community}
              outline
              disabled={isLoading}
            />
          </div>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="input-text"
            disabled={isLoading}
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind..."
            rows={8}
            className="focus:border-success focus:ring-success"
            disabled={isLoading}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="!border-t-0">
        <div className="flex flex-col gap-[10px] w-full lg:flex-row lg:justify-end">
          <Button
            color="success"
            className="no-border animate button-success"
            outline
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="success"
            className="no-border animate button-success"
            onClick={edit}
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
