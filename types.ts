
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  category: 'Frontend' | 'Backend' | 'Fullstack';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  // Fix: Added 'Backend' to allow skills like Node.js to be correctly categorized
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Backend';
  icon?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
