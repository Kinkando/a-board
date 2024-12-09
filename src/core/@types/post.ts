export interface Post {
  postId: string;
  communityId: number;
  communityName: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImageUrl?: string;
  commentCount: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface FilterPost {
  search?: string;
  communityId?: string;
}
