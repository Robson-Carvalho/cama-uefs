interface ITopic {
  id: string;
  classId: string;
  title: string;
  path: string;
  content: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { ITopic };
