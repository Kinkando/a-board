'use client';

import { useRouter } from 'next/navigation';
import CreatePostModal from '@/components/ui/CreatePostModal';
import { usePost } from '@/core/hooks/post';

export default function CreatePost() {
  document.title = 'Create Post | a Board';

  const { communities } = usePost();
  const { back } = useRouter();

  return <CreatePostModal communities={communities} isOpen onClose={back} />;
}
