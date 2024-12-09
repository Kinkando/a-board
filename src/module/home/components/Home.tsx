'use client';

import { Avatar, Button, Dropdown, TextInput } from 'flowbite-react';
import Link from 'next/link';
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

  const [isSearch, setIsSearch] = useState(false);

  const chooseCommunity = (cmt: Community) => {
    setCommunity((community) =>
      cmt.id === community.id ? undefinedCommunity : cmt,
    );
  };

  const highlight = (search: string) => {
    const regex = new RegExp(search, 'gi');
    const elements = document.getElementsByClassName('post');
    for (const element of elements) {
      const text = element.innerHTML.replace(
        /(<mark class="highlight bg-golden opacity-50">|<\/mark>)/gim,
        '',
      );
      element.innerHTML = text.replace(
        regex,
        '<mark class="highlight bg-golden opacity-50">$&</mark>',
      );
    }
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

  useEffect(() => {
    highlight(search.trim());
  }, [search, posts]);

  return (
    <div className="pt-12 px-4 lg:pt-0 lg:px-0">
      {/* Toolbar Section */}
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

        <Button
          className={
            'button-success no-border animate whitespace-nowrap max-[340px]:w-full h-10' +
            (isSearch ? ' min-[340px]:hidden sm:block' : '')
          }
        >
          Create +
        </Button>
      </div>

      {/* Post Sections */}
      {posts && (
        <div className="rounded-xl bg-white mt-6">
          {posts.map((post, index) => (
            <Link href={`/post/${post.postId}`} key={post.postId}>
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
                  <p className="post">{post.title}</p>
                </div>
                <div className="text-sm line-clamp-2 mb-[10px]">
                  <p className="post">{post.content}</p>
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
