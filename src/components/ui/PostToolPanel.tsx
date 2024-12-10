import { Button, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SearchIcon } from '@/components/icons';
import { Community } from '@/core/@types/community';
import { FilterPost, Post } from '@/core/@types/post';
import { usePostToolPanel } from '@/core/hooks/postToolPanel';
import CommunityDropdown from './CommunityDropdown';

const undefinedCommunity: Community = { id: 0, name: '' };

export type PostToolPanelProps = {
  posts: Post[];
  communities: Community[];
  getPosts: (filter: FilterPost) => Promise<void>;
  yourPost?: boolean;
};

export default function PostToolPanel({
  posts,
  communities,
  getPosts,
  yourPost,
}: PostToolPanelProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [isSearch, setIsSearch] = useState(false);
  const [community, setCommunity] = useState<Community>(
    searchParams.get('communityId')
      ? { id: Number(searchParams.get('communityId')), name: '' }
      : undefinedCommunity,
  );

  const { replaceQueryParams, highlight } = usePostToolPanel();

  const fetchPosts = useCallback(async () => {
    replaceQueryParams(search, community);
    await getPosts({
      search,
      communityId: community?.id,
      yourPost,
    });
  }, [replaceQueryParams, search, community, getPosts]);

  useEffect(() => {
    fetchPosts();
  }, [search, community]);

  useEffect(() => {
    highlight(search.trim());
  }, [search, posts]);

  return (
    <div className="flex max-[340px]:flex-col justify-between items-center min-h-10 gap-5">
      <div
        className={
          'stroke-[#5B5B5B] w-full sm:hidden max-[340px]:hidden' +
          (isSearch ? ' hidden' : '')
        }
      >
        <div
          className="w-fit cursor-pointer"
          onClick={() => {
            setIsSearch(true);
          }}
        >
          {SearchIcon}
        </div>
      </div>

      <div
        className={
          'w-full h-10 max-[340px]:block' +
          (!isSearch ? ' hidden sm:block' : '')
        }
      >
        <TextInput
          placeholder="Search"
          value={search}
          className="input-search"
          onChange={(e) => setSearch(e.target.value)}
          icon={() => <div className="stroke-[#5B5B5B]">{SearchIcon}</div>}
          onBlur={() => setIsSearch(false)}
        />
      </div>

      <div
        className={
          'text-black' + (isSearch ? ' min-[340px]:hidden sm:block' : '')
        }
      >
        <CommunityDropdown
          communities={communities}
          community={community}
          onSelectCommunity={setCommunity}
        />
      </div>

      <Link href="/post/create">
        <Button
          className={
            'button-success no-border animate whitespace-nowrap max-[340px]:w-full h-10' +
            (isSearch ? ' min-[340px]:hidden sm:block' : '')
          }
        >
          Create +
        </Button>
      </Link>
    </div>
  );
}
