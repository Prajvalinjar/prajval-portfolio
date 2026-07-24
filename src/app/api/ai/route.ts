import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const q = query.toLowerCase().trim();
    const knowledgeDir = path.join(process.cwd(), 'portfolio-knowledge');

    // 1. Check Contact Info & Direct Questions
    if (
      q.includes('contact') || 
      q.includes('email') || 
      q.includes('phone') || 
      q.includes('hire') || 
      q.includes('located') || 
      q.includes('reach') ||
      q.includes('social') ||
      q.includes('linkedin') ||
      q.includes('github')
    ) {
      return NextResponse.json({
        type: 'contact',
        summary: `Prajval Mahadev Injar\n\n📧 Email: injarprajval@gmail.com\n📞 Phone: +91 8788039282\n📍 Location: Kolhapur, Maharashtra\n💼 LinkedIn: linkedin.com/in/prajvalinjar\n💻 GitHub: github.com/prajvalinjar`,
        action: {
          label: "Open Let's Connect",
          targetId: "contact"
        },
        related: ["Download Resume", "Projects", "Engineering Stack"]
      });
    }

    // 2. Check Resume / CV Questions
    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return NextResponse.json({
        type: 'resume',
        summary: "Prajval's full engineering resume details his work in Full Stack Development, Data Analysis, and AI Integrations. You can view or download it directly in the Let's Connect section.",
        action: {
          label: "Open Let's Connect & Resume",
          targetId: "contact"
        },
        related: ["Contact Info", "Certifications", "Projects"]
      });
    }

    // 3. Check Projects (Markdown files in /projects/ or static fallback)
    try {
      const projectsDir = path.join(knowledgeDir, 'projects');
      const files = await fs.readdir(projectsDir);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const content = await fs.readFile(path.join(projectsDir, file), 'utf-8');
          const { data, content: body } = matter(content);
          
          const searchableText = `${data.title} ${data.type} ${data.techStack?.join(' ')} ${body}`.toLowerCase();
          
          if (searchableText.includes(q) || q.includes(data.title?.toLowerCase())) {
            const getSlugFromTitle = (title: string) => {
              const t = title.toLowerCase();
              if (t.includes("resumeiq")) return "resumeiq";
              if (t.includes("transitops")) return "transitops";
              if (t.includes("sales")) return "customer-sales-analysis";
              if (t.includes("tongue")) return "e-tongue";
              return t.replace(/\s+/g, "-");
            };
            const slug = getSlugFromTitle(data.title);

            return NextResponse.json({
              type: 'project',
              summary: `${data.title}: ${data.subtitle || data.type}. Built with ${data.techStack?.slice(0, 3).join(', ')}.`,
              data: {
                title: data.title,
                type: data.type,
                techStack: data.techStack || [],
                liveDemo: data.liveDemo,
                github: data.github,
                content: body
              },
              action: {
                label: `Open ${data.title} Case File`,
                targetId: `/projects/${slug}`
              },
              related: ["Tech Stack", "Growth"]
            });
          }
        }
      }
    } catch (e) {
      // Ignore if directory error
    }

    // Direct Project Fallbacks if query contains project name
    if (q.includes("resumeiq") || q.includes("resume")) {
      return NextResponse.json({
        type: 'project',
        summary: "ResumeIQ AI is an AI-powered resume analysis and optimization platform built with Next.js, Supabase, and AI APIs. It parses resumes and provides real-time ATS scoring.",
        action: {
          label: "Open ResumeIQ AI Case File",
          targetId: "/projects/resumeiq"
        },
        related: ["TransitOps", "Customer Sales Analysis"]
      });
    }

    if (q.includes("transit") || q.includes("transitops")) {
      return NextResponse.json({
        type: 'project',
        summary: "TransitOps is a real-time public transit logistics optimization platform featuring Google Maps API routing and dynamic vehicle tracking.",
        action: {
          label: "Open TransitOps Case File",
          targetId: "/projects/transitops"
        },
        related: ["ResumeIQ AI", "Customer Sales Analysis"]
      });
    }

    if (q.includes("sales") || q.includes("customer")) {
      return NextResponse.json({
        type: 'project',
        summary: "Customer Sales Analysis is a high-performance data analytics dashboard tracking sales trends, customer retention, and revenue forecasting.",
        action: {
          label: "Open Sales Analysis Case File",
          targetId: "/projects/customer-sales-analysis"
        },
        related: ["ResumeIQ AI", "TransitOps"]
      });
    }

    // 4. Tech Stack / Technologies / Tools
    if (q.includes('tech') || q.includes('stack') || q.includes('know') || q.includes('language') || q.includes('framework')) {
      return NextResponse.json({
        type: 'general',
        summary: "Prajval's core engineering stack includes Next.js, React, TypeScript, Python, PyTorch, TensorFlow, Supabase, Node.js, PostgreSQL, and Tailwind CSS.",
        action: {
          label: "Open Engineering Stack",
          targetId: "engineering-stack"
        },
        related: ["Projects", "Growth"]
      });
    }

    // 5. Certifications & Growth
    if (q.includes('cert') || q.includes('certification') || q.includes('deloitte') || q.includes('google') || q.includes('aws')) {
      return NextResponse.json({
        type: 'general',
        summary: "Prajval holds industry certifications from Deloitte (Technology Consulting Virtual Internship), Google, and AWS.",
        action: {
          label: "Open Professional Growth",
          targetId: "professional-growth"
        },
        related: ["Projects", "Experience"]
      });
    }

    // 6. Experience / Leadership
    if (q.includes('experience') || q.includes('work') || q.includes('background') || q.includes('education') || q.includes('who is prajval')) {
      return NextResponse.json({
        type: 'general',
        summary: "Prajval Mahadev Injar is a Full Stack Developer & Data Analyst. He specializes in building intelligent products, AI integrations, data pipelines, and scalable web apps.",
        action: {
          label: "Open Professional Growth",
          targetId: "professional-growth"
        },
        related: ["Certifications", "Contact Info"]
      });
    }

    // 7. General Knowledge Fallback (NEVER fails!)
    return NextResponse.json({
      type: 'general',
      summary: "Prajval Mahadev Injar is a Data Analyst & Full Stack Engineer specializing in AI-driven web applications and scalable software systems.\n\nHere is what I can show you:\n• Featured Projects (ResumeIQ AI, TransitOps, Sales Analysis)\n• Core Tech Stack (Next.js, TypeScript, Python, AI APIs)\n• Professional Growth & Certifications (Deloitte, Google)\n• Direct Contact Details & Resume",
      action: {
        label: "Open Projects",
        targetId: "projects"
      },
      related: ["Contact Info", "Engineering Stack", "Certifications"]
    });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json({
      type: 'general',
      summary: "Prajval Mahadev Injar is a Full Stack Developer & Data Analyst based in Kolhapur, Maharashtra.\n\nContact: injarprajval@gmail.com | +91 8788039282",
      action: {
        label: "Open Let's Connect",
        targetId: "contact"
      }
    });
  }
}
