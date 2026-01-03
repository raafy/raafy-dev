export interface IProject {
  _id: string;
  title: string;
  description: string;
  translations?: Record<string, { title?: string; description?: string }>;
  imageUrl: string;
  techStack: string[];
  platforms: string[];
  categories: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  startDate: Date;
  endDate?: Date;
  featured: boolean;
  status: "active" | "archived";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProjectInput = Omit<
  IProject,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateProjectInput = Partial<CreateProjectInput>;
