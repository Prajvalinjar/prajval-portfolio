import { JourneyMilestone, JourneyMetrics } from "@/types/journey";

export const JOURNEY_METRICS: JourneyMetrics = {
  yearsLearning: 3,
  projectsBuilt: 10,
  hackathons: 3,
  certificates: 4,
  techCount: 18,
  leadershipRoles: 3,
  openSourceContribs: 25
};

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "started-btech",
    slug: "started-btech",
    year: "2023",
    title: "Started B.Tech Computer Science Engineering",
    subtitle: "Dr. D. Y. Patil School of Engineering & Management, Kolhapur",
    categoryLabel: "FOUNDATION",
    summary: "Began formal Computer Science studies at DYPSEM, establishing core computational principles, logic algorithms, and team collaboration.",
    storyText: "My engineering journey started in August 2023 when I enrolled in the Computer Science and Engineering program at Dr. D. Y. Patil School of Engineering and Management, Kolhapur. Coming into engineering with immense curiosity, I immersed myself in core subjects: Object-Oriented Programming, Data Structures, Discrete Mathematics, and Computer System Organization. Beyond lectures, I discovered that true software mastery comes from writing code daily, failing fast, and building projects from scratch.",
    whatHappened: [
      "Enrolled in B.Tech Computer Science and Engineering at Dr. D. Y. Patil School of Engineering & Management (DYPSEM), Kolhapur.",
      "Mastered foundational programming concepts in C, C++, and Java.",
      "Participated in rural social internships, leading a 28-member student team to coordinate community infrastructure proposals.",
      "Built initial baseline console applications and mathematical logic engines."
    ],
    challenges: [
      "Transitioning from high school academic patterns to rigorous engineering problem-solving.",
      "Balancing heavy coursework with self-directed software development projects."
    ],
    whatILearned: [
      "Core Object-Oriented Programming (OOP) paradigms.",
      "Data structures: Arrays, Linked Lists, Stacks, Queues, and Trees.",
      "Team dynamics, conflict resolution, and technical leadership during social projects."
    ],
    lesson: "Strong fundamentals matter more than shortcuts.",
    techStack: ["C", "C++", "Java", "Linux", "Git"],
    achievements: [
      "Achieved 6.65 CGPA academic benchmark.",
      "Coordinated 28-member Rural Social Internship team in Wadipir, Kolhapur."
    ],
    relatedProjects: [
      { id: "e-tongue", title: "E-Tongue Dravya System", slug: "e-tongue" }
    ],
    images: [
      {
        url: "/images/journey_2023.webp",
        caption: "DYPSEM Engineering Campus & Academic Department",
        alt: "DYPSEM Campus",
        category: "Campus"
      }
    ],
    missingAssets: [
      "Campus lab photo with team",
      "Rural Social Internship presentation certificate"
    ],
    readingTimeMinutes: 3
  },
  {
    id: "first-programming",
    slug: "first-programming",
    year: "2024",
    title: "First Programming & Data Discovery",
    subtitle: "Learnt SQL, Python, Power BI and turned raw data into insights.",
    categoryLabel: "DIRECTION",
    summary: "Expanded into Python, SQL databases, and data manipulation libraries, uncovering the power of data engineering and software automation.",
    storyText: "In 2024, my focus shifted toward data engineering, analytical pipelines, and practical Python applications. I spent hundreds of hours mastering Python libraries (Pandas, NumPy, Matplotlib) and writing complex relational SQL queries in MySQL. I realized that data isn't just numbers in tables — when cleaned, structured, and visualized correctly through tools like Power BI, it reveals actionable business intelligence.",
    whatHappened: [
      "Self-taught Python for data analytics, scientific computing, and script automation.",
      "Built data manipulation pipelines executing Exploratory Data Analysis (EDA) on transactional customer records.",
      "Designed interactive Power BI business intelligence dashboards for executive decision-making.",
      "Constructed custom SQL relational schemas and query optimizations."
    ],
    challenges: [
      "Handling messy, inconsistent real-world datasets with missing values and duplicate rows.",
      "Optimizing SQL queries to run efficiently over multi-thousand row transactional tables."
    ],
    whatILearned: [
      "Data wrangling and feature engineering using Python (Pandas & NumPy).",
      "Relational database normalization and SQL JOIN operations.",
      "Building executive KPI dashboards in Power BI."
    ],
    lesson: "Data tells stories when you ask the right questions.",
    techStack: ["Python", "Pandas", "NumPy", "SQL", "MySQL", "Power BI"],
    achievements: [
      "Built Customer Sales Analytics pipeline saving 24+ weekly reporting hours.",
      "Completed foundational Python & SQL data modeling certifications."
    ],
    relatedProjects: [
      { id: "customer-sales-analytics", title: "Customer Sales Analytics", slug: "customer-sales-analysis" }
    ],
    images: [
      {
        url: "/images/journey_2024.webp",
        caption: "Data Analytics Dashboard & Python EDA Workbench",
        alt: "Data Analytics Workbench",
        category: "Project"
      }
    ],
    missingAssets: [
      "SQL Query optimization benchmark log",
      "Power BI Certification Badge"
    ],
    readingTimeMinutes: 4
  },
  {
    id: "virtual-internships",
    slug: "virtual-internships",
    year: "2025",
    title: "Virtual Internships & Industry Learning",
    subtitle: "Deloitte Data Analytics, EduSkills Java Full Stack & Google GDSC AI/ML",
    categoryLabel: "EXPERIENCE",
    summary: "Gained verified industry experience across data analytics, full-stack Java development, and machine learning virtual programs.",
    storyText: "During early 2025, I dedicated my time to intensive virtual industry programs offered by leading enterprise organizations. I completed the Deloitte Data Analytics Virtual Experience Program, analyzing client datasets and presenting executive summaries. Simultaneously, I earned the Java Full Stack Developer Virtual Internship through EduSkills & AICTE, followed by the AI/ML Virtual Internship organized by Google Developer Student Clubs (GDSC).",
    whatHappened: [
      "Completed Deloitte Data Analytics Virtual Experience Program.",
      "Completed Java Full Stack Developer Virtual Internship backed by EduSkills and AICTE.",
      "Participated in AI/ML Virtual Internship with Google Developer Club.",
      "Built web microservices integrating backend Java API endpoints with reactive frontend UI components."
    ],
    challenges: [
      "Navigating enterprise software architecture patterns under tight program deadlines.",
      "Bridging theoretical academic concepts with industry-standard web frameworks."
    ],
    whatILearned: [
      "Enterprise software architecture and RESTful API design.",
      "Supervised machine learning algorithms (Random Forest, SVM, Regression).",
      "Corporate presentation of analytics metrics to non-technical stakeholders."
    ],
    lesson: "Industry practice bridges the gap between theory and real-world execution.",
    techStack: ["Java", "React", "Node.js", "Python", "Machine Learning", "SQL"],
    achievements: [
      "Deloitte Data Analytics Virtual Program Certificate.",
      "Java Full Stack EduSkills (AICTE) Certification.",
      "Google GDSC AI/ML Virtual Internship Completion."
    ],
    relatedProjects: [
      { id: "e-tongue", title: "E-Tongue Dravya System", slug: "e-tongue" }
    ],
    images: [
      {
        url: "/images/journey_2025.webp",
        caption: "Virtual Internship Certificates & GDSC AI Workshops",
        alt: "Virtual Internships Certificate",
        category: "Certificate"
      }
    ],
    missingAssets: [
      "Deloitte Virtual Experience Certificate Scan",
      "Google GDSC AI/ML Workshop Group Screenshot"
    ],
    readingTimeMinutes: 4
  },

  {
    id: "leadership-community",
    slug: "leadership-community",
    year: "2026",
    title: "Leadership & Community Building",
    subtitle: "Hackathon Organizer, AWS Student Builder Lead & WordCamp Open Source Volunteer",
    categoryLabel: "LEADERSHIP",
    summary: "Led technical events for 120+ participants, organized campus hackathons, and contributed to open-source WordPress communities.",
    storyText: "Engineering is as much about people as it is about code. In 2026, I stepped into community leadership roles across campus and open-source initiatives. As the National Level Hackathon Organizer at DYPSEM, I led a 33+ volunteer team hosting over 120 developers. As Event Management Lead for the AWS Student Builder Group, I organized technical cloud workshops. I also volunteered with the WordPress Open Source Community during WordCamp 2025 and 2026.",
    whatHappened: [
      "Organized a National Level Hackathon managing 33+ volunteers and 120+ participant coders.",
      "Served as Event Management Lead for the AWS Student Builder Group at DYPSEM.",
      "Volunteered at WordCamp 2025 & 2026 Open Source Community events across India.",
      "Mentored junior engineering students in web development, Git version control, and AI integration."
    ],
    challenges: [
      "Managing complex event logistics, schedule dependencies, and live streaming setups for large developer audiences.",
      "Fostering an inclusive, high-energy environment for first-time hackathon attendees."
    ],
    whatILearned: [
      "Cross-functional team leadership and large-scale event organization.",
      "Public speaking, technical workshop facilitation, and community engagement.",
      "Open-source software governance and collaborative event execution."
    ],
    lesson: "Leadership is about empowering others to succeed.",
    techStack: ["AWS", "Git", "GitHub", "WordPress", "Next.js", "Public Speaking"],
    achievements: [
      "Successfully organized National Hackathon for 120+ participants.",
      "AWS Student Builder Group Leadership Lead.",
      "WordCamp 2025 & 2026 Open Source Community Volunteer."
    ],
    relatedProjects: [
      { id: "transitops", title: "TransitOps Fleet Platform", slug: "transitops" }
    ],
    images: [
      {
        url: "/images/journey_2026.webp",
        caption: "National Hackathon Organization & AWS Builder Group Event",
        alt: "Hackathon Organization Event",
        category: "Event"
      }
    ],
    missingAssets: [
      "WordCamp 2026 Volunteer Badge & Group Photo",
      "AWS Student Builder Group Event Poster"
    ],
    readingTimeMinutes: 4
  },
  {
    id: "building-ai-products",
    slug: "building-ai-products",
    year: "PRESENT",
    title: "Building Intelligent Digital Products",
    subtitle: "Architecting full-stack AI applications, fleet systems, and scalable modern web platforms.",
    categoryLabel: "MISSION",
    summary: "Combining AI inference, modern web engineering, and UX architecture to build impactful, production-grade applications.",
    storyText: "Today, I focus on building intelligent digital products that merge modern full-stack web engineering, serverless AI integrations, and intuitive UX architecture. From AI resume analyzers to enterprise transport fleet management systems like TransitOps, my goal is simple: engineer software that solves real problems with speed, clarity, and measurable impact.",
    whatHappened: [
      "Developed TransitOps enterprise fleet management platform with real-time telemetry and map dispatches.",
      "Continuous iteration and feature enhancement on ResumeIQ AI and analytics microservices.",
      "Architecting production-ready Next.js portfolio and technical dashboards.",
      "Exploring cutting-edge LLM agent architectures and edge computing frameworks."
    ],
    challenges: [
      "Maintaining low-latency response times for real-time WebSocket vehicle telemetry and AI streaming.",
      "Balancing sleek modern design aesthetics with strict web performance and accessibility targets."
    ],
    whatILearned: [
      "Advanced Next.js App Router patterns, server actions, and Turbopack optimizations.",
      "Building glassmorphic, accessible design systems with Tailwind CSS and Framer Motion.",
      "Designing resilient software architectures prepared for cloud scale."
    ],
    lesson: "The journey never ends. It evolves.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI", "Python", "Vercel"],
    achievements: [
      "Production deployment of 4 major engineering platforms.",
      "18+ technologies mastered across full-stack and data engineering.",
      "Built production-ready portfolio dashboard."
    ],
    relatedProjects: [
      { id: "resumeiq-ai", title: "ResumeIQ AI", slug: "resumeiq" },
      { id: "transitops", title: "TransitOps Fleet Management", slug: "transitops" },
      { id: "customer-sales-analytics", title: "Customer Sales Analytics", slug: "customer-sales-analysis" }
    ],
    images: [
      {
        url: "/images/journey_today.webp",
        caption: "Modern Engineering Dashboard & AI Product Suite",
        alt: "Modern AI Products",
        category: "Project"
      }
    ],
    missingAssets: [
      "Latest AI Product System Architecture Diagram",
      "Live Demo Screen Recording GIF"
    ],
    readingTimeMinutes: 3
  }
];

export function getMilestoneBySlug(slug: string): JourneyMilestone | undefined {
  return JOURNEY_MILESTONES.find((m) => m.slug === slug);
}
