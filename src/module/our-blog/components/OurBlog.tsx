'use client';

import React from 'react';
import PostCard from '@/components/ui/PostCard';
import PostToolPanel from '@/components/ui/PostToolPanel';
import { usePost } from '@/core/hooks/post';

export default function OurBlog() {
  const { posts, communities, fetchPosts } = usePost();

  return (
    <div className="lg:p-8">
      <div className="pt-12 pb-4 px-4 lg:pt-0 lg:px-0 xl:max-w-[calc(100%-280px)]">
        <PostToolPanel
          posts={posts}
          communities={communities}
          getPosts={fetchPosts}
          yourPost
        />

        {posts && (
          <div className="rounded-xl bg-white mt-6">
            {posts.map((post, index) => (
              <React.Fragment key={post.postId}>
                <PostCard key={post.postId} post={post} isAuthor />
                {index !== posts.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
