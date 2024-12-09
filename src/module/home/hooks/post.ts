import { useEffect, useState } from 'react';
import { Community } from '@/core/@types/community';
import { FilterPost, Post } from '@/core/@types/post';
import { getCommunities } from '@/core/repository/community';
import { listPosts } from '@/core/repository/post';

export function usePost() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const communities = await getCommunities();
      setCommunities(communities ?? []);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setCommunities([]);
    }
  };

  const fetchPosts = async ({ communityId, search }: FilterPost) => {
    try {
      const posts = await listPosts({
        communityId: communityId || undefined,
        search: search?.trim() || undefined,
      });
      setPosts(posts ?? []);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setPosts([]);
    }
  };

  return {
    communities,
    posts,
    fetchPosts,
  };
}
