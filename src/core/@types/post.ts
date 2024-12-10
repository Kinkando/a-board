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
  communityId?: number;
  authorId?: string;
  yourPost?: boolean;
}

export interface PostDetail {
  postId: string;
  communityId: number;
  communityName: string;
  authorId: string;
  authorName: string;
  authorImageUrl?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  editable?: boolean;
  deletable?: boolean;
  commentCount: number;
}

export interface Comment {
  commentId: string;
  comment: string;
  userId: string;
  username: string;
  userImageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
  editable?: boolean;
  deletable?: boolean;
}
