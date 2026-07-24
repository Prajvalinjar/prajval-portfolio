export type ProjectStatus = "Production" | "Research" | "Prototype" | "Completed" | "In Progress";
export type ProjectCategory = "AI" | "Data Analytics" | "Full Stack" | "IoT" | "Hackathon" | "Open Source";

export interface ProjectMetrics {
  users?: string;
  accuracy?: string;
  performance?: number;
  health?: number;
  impact: string;
}

export interface ProjectTimeline {
  startDate: string;
  completionDate: string;
  duration: string;
  status: ProjectStatus;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  mission: string;
  challenge: string;
  solution: string;
  impact: string;
  features: string[];
  techStack: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  health: number;
  performance?: number;
  complexity: "Basic" | "Intermediate" | "Advanced";
  architecture?: string;
  duration: string;
  startDate?: string;
  completionDate?: string;
  image: string;
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
  docUrl?: string;
  deploymentPlatform?: string;
  lastUpdated?: string;
  users?: string;
  tags?: string[];
}

export interface CaseStudySection {
  title: string;
  content: string;
}

export interface CaseStudyChallenge {
  problem: string;
  solution: string;
}

export interface CaseStudy {
  id: string;
  projectNum: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  duration: string;
  startDate: string;
  completionDate: string;
  role: string;
  platform: string;
  image: string;
  screenshots: string[];
  liveUrl?: string;
  githubUrl?: string;
  docUrl?: string;
  
  overview: string;
  problemStatement: string;
  research: string;
  planning: string;
  architecture: {
    title: string;
    description: string;
    diagramType: string;
    components: { name: string; type: string; details: string }[];
  };
  techStackDetails: { category: string; items: string[] }[];
  databaseDesign: {
    engine: string;
    schemaOverview: string;
    tables: { name: string; fields: string; purpose: string }[];
  };
  challenges: CaseStudyChallenge[];
  results: { metric: string; label: string; description: string }[];
  lessonsLearned: string[];
  futureImprovements: string[];
}
