interface ITopic {
  id: string;
  classId: string;
  title: string;
  path: string;
  content: string;
  order: number;
  isPublished: boolean;
  views: number;
  likes: number;
  authorId?: string | null;
  author?: { name: string; email: string } | null;
  coAuthors?: { name: string; email: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export { ITopic };
