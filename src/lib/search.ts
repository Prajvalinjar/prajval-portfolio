import { Project } from "@/types/project";

/**
 * Fuzzy search & partial string matching helper
 */
export function searchProjects(projects: Project[], query: string): Project[] {
  if (!query || query.trim() === "") return projects;

  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/);

  return projects.filter((project) => {
    const title = project.title.toLowerCase();
    const subtitle = project.subtitle.toLowerCase();
    const mission = project.mission.toLowerCase();
    const challenge = project.challenge.toLowerCase();
    const solution = project.solution.toLowerCase();
    const category = project.category.toLowerCase();
    const status = project.status.toLowerCase();
    const techStack = project.techStack.map((t) => t.toLowerCase());
    const tags = (project.tags || []).map((t) => t.toLowerCase());

    // Check if every token matches at least one field in the project
    return tokens.every((token) => {
      return (
        title.includes(token) ||
        subtitle.includes(token) ||
        mission.includes(token) ||
        challenge.includes(token) ||
        solution.includes(token) ||
        category.includes(token) ||
        status.includes(token) ||
        techStack.some((t) => t.includes(token)) ||
        tags.some((t) => t.includes(token)) ||
        // Alias shortcuts
        (token === "resumeiq" && title.includes("resumeiq")) ||
        (token === "transitops" && title.includes("transitops")) ||
        (token === "sales" && (title.includes("sales") || tags.includes("customer sales analysis"))) ||
        (token === "tongue" && title.includes("tongue"))
      );
    });
  });
}

/**
 * Returns suggested search keywords if search yields 0 results
 */
export function getSearchSuggestions(): string[] {
  return ["ResumeIQ", "TransitOps", "Customer Sales Analysis", "E-Tongue", "Next.js", "Python", "Supabase", "Power BI", "AI"];
}
