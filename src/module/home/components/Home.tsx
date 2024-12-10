'use client';

import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import PostToolPanel from '@/components/ui/PostToolPanel';
import { usePost } from '@/core/hooks/post';

export default function Home() {
  const { posts, communities, fetchPosts } = usePost();

  return (
    <div className="lg:p-8">
      <div className="pt-12 pb-4 px-4 lg:pt-0 lg:px-0 xl:max-w-[calc(100%-280px)]">
        <PostToolPanel
          posts={posts}
          communities={communities}
          getPosts={fetchPosts}
        />

        {posts && (
          <div className="rounded-xl bg-white mt-6">
            {posts.map((post, index) => (
              <Link href={`/post/${post.postId}`} key={post.postId}>
                <PostCard key={post.postId} post={post} />
                {index !== posts.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
