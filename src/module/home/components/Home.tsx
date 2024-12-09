'use client';

import { Avatar, Button, Dropdown, TextInput } from 'flowbite-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CheckIcon, MessageIcon, SearchIcon } from '@/components/icons';
import { Community } from '@/core/@types/community';
import { usePost } from '@/module/home/hooks/post';

const undefinedCommunity: Community = { id: 0, name: '' };

export default function Home() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [community, setCommunity] = useState<Community>(
    searchParams.get('communityId')
      ? { id: Number(searchParams.get('communityId')), name: '' }
      : undefinedCommunity,
  );
  const { posts, communities, fetchPosts } = usePost();
  const router = useRouter();

  const chooseCommunity = (cmt: Community) => {
    setCommunity((community) =>
      cmt.id === community.id ? undefinedCommunity : cmt,
    );
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    if (community?.id) {
      params.set('communityId', community.id.toString());
    } else {
      params.delete('communityId');
    }

    router.replace(`?${params.toString()}`);
    fetchPosts({ search, communityId: community?.id });
  }, [search, community]);

  return (
    <div className="pt-12 px-4 lg:pt-0 lg:px-0">
      {/* Toolbar Section */}
      <div className="flex justify-between items-center h-10 gap-5">
        <div className="w-full">
          <TextInput
            placeholder="Search"
            value={search}
            className="input-search"
            onChange={(e) => setSearch(e.target.value)}
            icon={() => <div className="stroke-[#5B5B5B]">{SearchIcon}</div>}
          />
        </div>

        <div className="text-black">
          <Dropdown label="Community" inline>
            {!communities.length && (
              <Dropdown.Item className="inactive">
                <div className="min-w-[200px] text-start flex items-center gap-4 justify-between">
                  No Community
                </div>
              </Dropdown.Item>
            )}
            {communities.map((cmt) => (
              <Dropdown.Item
                key={cmt.id}
                className={community.id === cmt.id ? 'active' : ''}
                onClick={() => chooseCommunity(cmt)}
              >
                <div className="min-w-[200px] text-start flex items-center gap-4 justify-between">
                  {cmt.name}
                  {community.id === cmt.id && (
                    <div className="stroke-black">{CheckIcon}</div>
                  )}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        <Button className="button-success no-border animate whitespace-nowrap">
          Create +
        </Button>
      </div>

      {/* Post Sections */}
      {posts && (
        <div className="rounded-xl bg-white mt-6">
          {posts.map((post, index) => (
            <React.Fragment key={post.postId}>
              <div className="p-5 text-black">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar img={post.authorImageUrl} rounded />
                  <span className="text-grey-300 text-ellipsis whitespace-nowrap overflow-hidden">
                    {post.authorName}
                  </span>
                </div>
                <div className="rounded-2xl bg-[#F3F3F3] px-2 py-1 w-fit text-[#4A4A4A] text-sm mb-1">
                  {post.communityName}
                </div>
                <div className="font-semibold text-base line-clamp-1">
                  {post.title}
                </div>
                <div className="text-sm line-clamp-2 mb-[10px]">
                  {post.content}
                </div>
                <div className="flex items-center gap-1 text-grey-300 stroke-grey-300">
                  {MessageIcon}
                  <span className="text-xs font-normal">
                    {post.commentCount}{' '}
                    {post.commentCount > 0 ? 'Comments' : 'Comment'}
                  </span>
                </div>
              </div>
              {index !== posts.length - 1 && <hr className="border-gray-300" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
