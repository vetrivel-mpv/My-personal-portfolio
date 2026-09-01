export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Test Architecture" | "Telecom OSS/BSS" | "Full Stack" | "General QA" | "Full-Stack & GitHub";
  icon: string; // Emoji
  techs: string[];
  impact: string;
  imageUrl?: string;
  githubUrl?: string;
  stars?: number;
  forks?: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string; // Markdown or plain text
  summary: string;
  category: "Architecture" | "Systems Quality" | "Telecom Insights" | "Career Transition";
  readTime: string;
  createdAt: string;
  status: "published" | "draft";
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  replied?: boolean;
}

export interface AdminSession {
  token: string;
  username: string;
  isAuthenticated: boolean;
}

export interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
