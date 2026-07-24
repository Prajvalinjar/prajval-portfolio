import { Project, ProjectCategory } from "@/types/project";

export type FilterCategory =
  | "All"
  | "AI"
  | "Data Analytics"
  | "Full Stack"
  | "IoT"
  | "Hackathon"
  | "Completed"
  | "In Progress";

export const FILTER_CHIPS: FilterCategory[] = [
  "All",
  "AI",
  "Data Analytics",
  "Full Stack",
  "IoT",
  "Hackathon",
  "Completed",
  "In Progress"
];

export function filterProjects(
  projects: Project[],
  categoryFilter: FilterCategory,
  selectedTech: string | null = null
): Project[] {
  return projects.filter((project) => {
    // 1. Category / Status Chip Filter
    let matchesChip = true;
    if (categoryFilter === "All") {
      matchesChip = true;
    } else if (
      categoryFilter === "AI" ||
      categoryFilter === "Data Analytics" ||
      categoryFilter === "Full Stack" ||
      categoryFilter === "IoT" ||
      categoryFilter === "Hackathon"
    ) {
      matchesChip = project.category === categoryFilter;
    } else if (categoryFilter === "Completed") {
      matchesChip = project.status === "Production" || project.status === "Completed";
    } else if (categoryFilter === "In Progress") {
      matchesChip = project.status === "Research" || project.status === "Prototype" || project.status === "In Progress";
    }

    // 2. Clickable Technology Tag Filter
    let matchesTech = true;
    if (selectedTech) {
      matchesTech = project.techStack.some(
        (t) => t.toLowerCase() === selectedTech.toLowerCase()
      );
    }

    return matchesChip && matchesTech;
  });
}

export function calculateFilterCounts(
  projects: Project[]
): Record<FilterCategory, number> {
  const counts: Record<FilterCategory, number> = {
    All: projects.length,
    AI: 0,
    "Data Analytics": 0,
    "Full Stack": 0,
    IoT: 0,
    Hackathon: 0,
    Completed: 0,
    "In Progress": 0
  };

  projects.forEach((project) => {
    if (project.category in counts) {
      counts[project.category as keyof typeof counts]++;
    }
    if (project.status === "Production" || project.status === "Completed") {
      counts.Completed++;
    }
    if (project.status === "Research" || project.status === "Prototype" || project.status === "In Progress") {
      counts["In Progress"]++;
    }
  });

  return counts;
}
