export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  platform: Platform;
  status: PostStatus;
  scheduledAt: string | null;
  createdAt: string;
}

export type Platform = "twitter" | "linkedin" | "instagram" | "facebook" | "tiktok" | "pinterest";

export type PostStatus = "draft" | "scheduled" | "published" | "failed";

export interface ConnectedPlatform {
  id: string;
  platform: Platform;
  username: string;
  connected: boolean;
  connectedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
}

export interface PlatformStats {
  platform: Platform;
  followers: string;
  engagement: string;
  posts: number;
}

export interface Analytics {
  totalFollowers: number;
  totalEngagement: number;
  postsThisMonth: number;
  reachThisMonth: number;
}
