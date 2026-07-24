export type TechCategory = 
  | "Programming Languages" 
  | "Frontend" 
  | "Backend" 
  | "Databases" 
  | "AI & Data" 
  | "Tools & Cloud";

export type ProficiencyLevel = "Expert" | "Advanced" | "Intermediate" | "Learning";

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  tagline: string;
  proficiency: ProficiencyLevel;
  proficiencyScore: number; // 1 to 5 dots
  libraries: string[];
  purpose: string[];
  usedInProjects: string[]; // project IDs: "resumeiq-ai", "transitops", "customer-sales-analytics", "e-tongue"
  icon?: string;
}

export const TECHNOLOGIES: Technology[] = [
  // 1. Programming Languages
  {
    id: "python",
    name: "Python",
    category: "Programming Languages",
    tagline: "High-level programming language for data, AI and backend development.",
    proficiency: "Intermediate",
    proficiencyScore: 4,
    libraries: ["Pandas", "NumPy", "Scikit-learn", "OpenAI", "Matplotlib", "Seaborn"],
    purpose: ["Data Analysis & Visualization", "Machine Learning", "AI Integrations", "Backend Development"],
    usedInProjects: ["customer-sales-analytics", "e-tongue"]
  },
  {
    id: "java",
    name: "Java",
    category: "Programming Languages",
    tagline: "Object-oriented language for enterprise applications and data structures.",
    proficiency: "Intermediate",
    proficiencyScore: 3,
    libraries: ["Spring Boot", "JUnit", "Collections Framework"],
    purpose: ["Object Oriented Architecture", "Algorithm Design", "Backend Systems"],
    usedInProjects: []
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming Languages",
    tagline: "Core scripting language powering dynamic web interfaces and web applications.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["ES6+", "Async/Await", "DOM API", "Fetch API"],
    purpose: ["Interactive UI Logic", "Async Data Flow", "Full-Stack Scripting"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming Languages",
    tagline: "Typed superset of JavaScript bringing type-safety to scalable applications.",
    proficiency: "Intermediate",
    proficiencyScore: 4,
    libraries: ["Strict Typing", "Interfaces", "Generics", "Zod"],
    purpose: ["Type Safety", "Refactoring Security", "Scalable App Architecture"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },
  {
    id: "sql",
    name: "SQL",
    category: "Programming Languages",
    tagline: "Relational database query language for data manipulation and analytics.",
    proficiency: "Advanced",
    proficiencyScore: 4,
    libraries: ["PostgreSQL", "MySQL Queries", "Joins & Aggregations"],
    purpose: ["Database Querying", "Data Transformations", "Business Reporting"],
    usedInProjects: ["customer-sales-analytics"]
  },

  // 2. Frontend
  {
    id: "react",
    name: "React",
    category: "Frontend",
    tagline: "Component-driven UI library for building interactive single-page applications.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["React Hooks", "Context API", "Framer Motion", "React Router"],
    purpose: ["Component Design Systems", "State Synchronization", "Responsive UI"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    tagline: "Full-stack React framework enabling server rendering, routing, and APIs.",
    proficiency: "Advanced",
    proficiencyScore: 4,
    libraries: ["App Router", "SSR / SSG", "Server Actions", "API Routes"],
    purpose: ["Production Web Apps", "SEO Optimization", "Serverless API Endpoints"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    tagline: "Utility-first CSS framework for rapid modern UI development.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["Flexbox / Grid", "Dark Mode", "Custom Design Tokens"],
    purpose: ["Custom Glassmorphism UI", "Responsive Layout Math", "Design Systems"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Frontend",
    tagline: "Semantic markup standard structuring modern web applications.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["Semantic Elements", "Web Storage", "Canvas API"],
    purpose: ["Accessibility (a11y)", "DOM Hierarchy", "SEO Structure"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Frontend",
    tagline: "Styling specification providing animations, grids, and visual effects.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["CSS Variables", "Keyframes", "Grid & Flexbox"],
    purpose: ["Micro-animations", "Custom Scrollbars", "Theme Variables"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },

  // 3. Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    tagline: "Event-driven asynchronous JavaScript runtime for backend services.",
    proficiency: "Intermediate",
    proficiencyScore: 4,
    libraries: ["NPM Ecosystem", "FS Module", "HTTP/HTTPS Modules"],
    purpose: ["RESTful API Development", "Backend Services", "Asynchronous I/O"],
    usedInProjects: ["transitops"]
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    tagline: "Minimalist web framework for Node.js routing and server middleware.",
    proficiency: "Intermediate",
    proficiencyScore: 3,
    libraries: ["Express Router", "CORS Middleware", "JSON Parsers"],
    purpose: ["API Endpoint Routing", "Authentication Middleware", "Microservices"],
    usedInProjects: ["transitops"]
  },

  // 4. Databases
  {
    id: "mysql",
    name: "MySQL",
    category: "Databases",
    tagline: "Enterprise relational database management system for structured data.",
    proficiency: "Advanced",
    proficiencyScore: 4,
    libraries: ["Relational Schemas", "Indexing", "Foreign Keys"],
    purpose: ["Structured Data Storage", "Transactional Systems", "Data Modeling"],
    usedInProjects: []
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Databases",
    tagline: "Open-source Postgres backend providing real-time databases and Auth.",
    proficiency: "Intermediate",
    proficiencyScore: 4,
    libraries: ["PostgreSQL", "Row Level Security (RLS)", "Storage Buckets", "Auth"],
    purpose: ["Realtime Syncing", "User Authentication", "Secure Cloud Storage"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },

  // 5. AI & Data
  {
    id: "openai",
    name: "OpenAI",
    category: "AI & Data",
    tagline: "State-of-the-art LLM API integration for automated intelligence and evaluation.",
    proficiency: "Intermediate",
    proficiencyScore: 4,
    libraries: ["GPT-4o API", "Embeddings", "Structured JSON Outputs"],
    purpose: ["Automated ATS Scoring", "Intelligent Resume Evaluation", "NLP Parsing"],
    usedInProjects: ["resumeiq-ai"]
  },
  {
    id: "powerbi",
    name: "Power BI",
    category: "AI & Data",
    tagline: "Business intelligence suite for transforming data into visual dashboards.",
    proficiency: "Intermediate",
    proficiencyScore: 4,
    libraries: ["DAX Queries", "Power Query", "Interactive Visuals"],
    purpose: ["Executive KPI Dashboards", "Sales Trend Visualizations", "Business Reporting"],
    usedInProjects: ["customer-sales-analytics"]
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "AI & Data",
    tagline: "High-performance Python library for data manipulation and analysis.",
    proficiency: "Advanced",
    proficiencyScore: 4,
    libraries: ["DataFrames", "Series", "Groupby Aggregations", "Data Cleaning"],
    purpose: ["Exploratory Data Analysis (EDA)", "Feature Engineering", "Dataset Cleaning"],
    usedInProjects: ["customer-sales-analytics", "e-tongue"]
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "AI & Data",
    tagline: "Fundamental package for scientific computing and multi-dimensional arrays.",
    proficiency: "Advanced",
    proficiencyScore: 4,
    libraries: ["N-dimensional Arrays", "Vectorized Math", "Linear Algebra"],
    purpose: ["Numerical Processing", "Matrix Operations", "Sensor Signal Math"],
    usedInProjects: ["customer-sales-analytics", "e-tongue"]
  },

  // 6. Tools & Cloud
  {
    id: "git",
    name: "Git",
    category: "Tools & Cloud",
    tagline: "Distributed version control system for tracking code changes.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["Branching Strategies", "Rebase", "Merge Conflict Resolution"],
    purpose: ["Version Control", "Collaborative Development", "Release Tagging"],
    usedInProjects: ["resumeiq-ai", "transitops", "customer-sales-analytics", "e-tongue"]
  },
  {
    id: "github",
    name: "GitHub",
    category: "Tools & Cloud",
    tagline: "Developer platform for repository hosting, pull requests, and CI/CD.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["GitHub Actions", "Pull Requests", "Code Reviews"],
    purpose: ["Open Source Publishing", "Automated Workflows", "Team Collaboration"],
    usedInProjects: ["resumeiq-ai", "transitops", "customer-sales-analytics", "e-tongue"]
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Tools & Cloud",
    tagline: "Extensible code editor optimized for web and full-stack development.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["Emmet", "Debugger", "Prettier", "ESLint Integration"],
    purpose: ["Agile Development", "Live Debugging", "Environment Management"],
    usedInProjects: ["resumeiq-ai", "transitops", "customer-sales-analytics", "e-tongue"]
  },
  {
    id: "figma",
    name: "Figma",
    category: "Tools & Cloud",
    tagline: "Interface design and interactive prototyping software.",
    proficiency: "Intermediate",
    proficiencyScore: 4,
    libraries: ["Auto Layout", "Design Tokens", "Wireframing"],
    purpose: ["UI Mockup Design", "User Flow Diagrams", "Component Specs"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tools & Cloud",
    tagline: "Frontend cloud platform for instant deployment and serverless execution.",
    proficiency: "Advanced",
    proficiencyScore: 5,
    libraries: ["Edge Network", "Serverless Functions", "Environment Secrets"],
    purpose: ["Production Deployment", "Automated Preview Deploys", "Global CDN"],
    usedInProjects: ["resumeiq-ai", "transitops"]
  }
];
