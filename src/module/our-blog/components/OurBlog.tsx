'use client';

import React, { useState } from 'react';
import PostCard from '@/components/ui/PostCard';
import PostToolPanel from '@/components/ui/PostToolPanel';
import { usePost } from '@/core/hooks/post';
import EditPostModal from '@/components/ui/EditPostModal';
import { Post } from '@/core/@types/post';
import DeletePostModal from '@/components/ui/DeletePostModal';

export default function OurBlog() {
  const { posts, setPosts, communities, fetchPosts } = usePost();
  const [openModal, setOpenModal] = useState<'edit' | 'delete' | 'closed'>(
    'closed',
  );
  const [selectedPost, setSelectedPost] = useState<Post>();

  const selectPost = (post: Post, event: 'edit' | 'delete') => {
    setSelectedPost(post);
    setOpenModal(event);
  };

  const onEdit = (data: Post) => {
    setSelectedPost(undefined);
    setPosts((posts) =>
      posts.map((post) =>
        post.postId === data.postId ? { ...post, ...data } : post,
      ),
    );
  };

  const onDelete = (postId: string) => {
    setSelectedPost(undefined);
    setPosts((posts) => posts.filter((post) => post.postId !== postId));
  };

  return (
    <>
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
                  <PostCard
                    key={post.postId}
                    post={post}
                    isAuthor
                    onEdit={() => selectPost(post, 'edit')}
                    onDelete={() => selectPost(post, 'delete')}
                  />
                  {index !== posts.length - 1 && (
                    <hr className="border-gray-300" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPost && (
        <>
          <EditPostModal
            isOpen={openModal === 'edit'}
            onClose={() => setOpenModal('closed')}
            onEdit={onEdit}
            post={selectedPost}
            communities={communities}
          />
          <DeletePostModal
            isOpen={openModal === 'delete'}
            onClose={() => setOpenModal('closed')}
            onDelete={onDelete}
            postId={selectedPost.postId}
          />
        </>
      )}
    </>
  );
}
