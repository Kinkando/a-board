import { Button, Modal, Textarea, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';
import CommunityDropdown from './CommunityDropdown';
import { Community } from '@/core/@types/community';
import GlobalContext from '@/core/context/global';
import { createPost } from '@/core/repository/post';

export type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  communities: Community[];
};

export default function CreatePostModal({
  isOpen,
  onClose,
  communities,
}: CreatePostModalProps) {
  const { alert } = useContext(GlobalContext);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [community, setCommunity] = useState<Community>();

  const create = useCallback(async () => {
    if (!community || !community.id) {
      alert({ message: 'Community is required', severity: 'warning' });
      return;
    }
    if (!title.trim()) {
      alert({ message: 'Title is required', severity: 'warning' });
      return;
    }
    if (!content.trim()) {
      alert({ message: 'Content is required', severity: 'warning' });
      return;
    }
    try {
      setIsLoading(true);
      const data = {
        title: title.trim(),
        content: content.trim(),
        communityId: community.id,
      };
      const postId = await createPost(data);
      push(`/post/${postId}`);
    } catch (error) {
      setIsLoading(false);
      alert({
        message: `${error}`,
        severity: 'error',
      });
    }
  }, [title, content, community]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className="!border-b-0">Create Post</Modal.Header>
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
            onClick={create}
            isProcessing={isLoading}
            disabled={isLoading}
          >
            Post
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
