export interface GalleryImage {
  url: string;
  caption: string;
  alt: string;
  category: "Campus" | "Hackathon" | "Certificate" | "Project" | "Event" | "Achievement";
}

export interface JourneyMilestone {
  id: string;
  slug: string;
  year: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  summary: string;
  storyText: string;
  whatHappened: string[];
  challenges: string[];
  whatILearned: string[];
  lesson: string; // Core engineering quote
  techStack: string[];
  achievements: string[];
  relatedProjects: { id: string; title: string; slug: string }[];
  images: GalleryImage[];
  missingAssets?: string[]; // Asset upload request prompts if assets missing
  readingTimeMinutes?: number;
}

export interface JourneyMetrics {
  yearsLearning: number;
  projectsBuilt: number;
  hackathons: number;
  certificates: number;
  techCount: number;
  leadershipRoles: number;
  openSourceContribs: number;
}
