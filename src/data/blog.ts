export type BlogBlock = {
  type: "heading" | "paragraph" | "list" | "quote" | "code";
  text?: string;
  items?: string[];
  language?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  pinned?: boolean;
  status: "published" | "draft";
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
];

export const publishedPosts = blogPosts
  .filter((post) => post.status === "published")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getBlogPost = (slug: string) => publishedPosts.find((post) => post.slug === slug);

export const getRelatedPosts = (post: BlogPost, limit = 3) => publishedPosts
  .filter((candidate) => candidate.slug !== post.slug)
  .map((candidate) => ({
    post: candidate,
    score:
      (candidate.category === post.category ? 2 : 0) +
      candidate.tags.filter((tag) => post.tags.includes(tag)).length,
  }))
  .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
  .slice(0, limit)
  .map(({ post: relatedPost }) => relatedPost);
