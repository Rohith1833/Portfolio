export interface Project {
  title: string;
  description: string;
  techStack: string[];
  features?: {
    live: string[];
    inProgress: string[];
    planned: string[];
  };
  listFeatures?: string[];
  challenges?: string[];
  badge?: "Live" | "In Progress" | "Academic" | "Concept";
  githubUrl?: string;
  demoUrl?: string;
  role?: string;
}

export interface Hackathon {
  title: string;
  team: string;
  role: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  category: string;
  year?: string;       // Optional: fill in from the actual certificate
  pdfPath: string;     // Path under /public, e.g. "/certificates/ai-foundations.pdf"
}

export interface PortfolioConfig {
  name: string;
  preferredName: string;
  status: string;
  positioning: string;
  careerObjective: string;
  interests: string[];
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  resumePath: string;
  contactEmail: string;
  instagramUrl: string;
  contactPhone: string;
  learningNote: string;
  currentlyBuilding: string;
  skills: {
    category: string;
    items: string[];
  }[];
  featuredProjects: Project[];
  academicProjects: Project[];
  experience: Hackathon[];
  certifications: Certification[];
  education: {
    degree: string;
    semester?: string;
    institution: string;
    location: string;
  };
}

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  name: "Rohith Gowda S.",
  preferredName: "Rohith",
  status: "BCA Student / Software Development Fresher",
  positioning: "A developer focused on building full-stack applications, AI-powered systems, and intelligent automations.",
  careerObjective: "I build full-stack web apps, AI tools, and automation systems focused on solving real-world problems.I’m currently open to freelance, full-time, and fresher roles where I can learn and contribute.",
  interests: [
    "Full-stack Web Development",
    "AI-powered Applications",
    "Practical Software Products",
    "Modern Web Tech",
    "Backend & Databases",
    "Workflow Automation",
    "Learning by Building"
  ],
  githubUsername: "Rohith1833",
  githubUrl: "https://github.com/Rohith1833",
  linkedinUrl: "https://www.linkedin.com/in/rohith-gowda-s-449939339/",
  resumePath: "",  // Add path to resume PDF here (e.g. "/resume.pdf") when ready
  contactEmail: "rohithmohith78@gmail.com",
  instagramUrl: "https://www.instagram.com/rohith_s_08/",
  contactPhone: "+91 8147432095",
  learningNote: "Currently continuing to learn cloud deployment, production practices, security, backend architecture, and scalable app design.",
  currentlyBuilding: "Full-stack applications, AI-powered tools, and automation workflows.",
  skills: [
    {
      category: "Languages",
      items: ["C", "Java", "Python", "JavaScript", "TypeScript", "SQL"]
    },
    {
      category: "Frontend",
      items: [
        "HTML", "CSS", "JavaScript", "React", "TypeScript", "Vite",
        "Tailwind CSS", "React Router", "React Hook Form", "Zod", "Recharts", "Framer Motion"
      ]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "TypeScript", "Flask", "REST APIs", "Prisma ORM"]
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "Firebase Firestore", "Supabase"]
    },
    {
      category: "AI & Automation",
      items: [
        "Generative AI APIs", "AI-powered Applications", "LLM Workflows",
        "AI Automation", "n8n", "Prompt Engineering"
      ]
    },
    {
      category: "Tools & Deployment",
      items: [
        "Git", "GitHub", "VS Code", "MySQL Workbench", "draw.io",
        "Vercel", "Render", "Firebase", "Supabase"
      ]
    }
  ],
  featuredProjects: [
    {
      title: "Health Tracker PWA",
      description: "Full-stack health & fitness tracking Progressive Web App, built with a production-oriented approach rather than a simple CRUD project. Focused entirely on convenient home-workouts.",
      techStack: [
        "React", "TypeScript", "Vite", "Tailwind CSS", "React Router",
        "React Hook Form", "Zod", "Recharts", "Node.js", "Express",
        "PostgreSQL", "Prisma ORM", "Supabase Auth"
      ],
      role: "Full stack development and implementation, AI-assisted where useful, with thorough testing of code base.",
      badge: "Live",
      features: {
        live: [
          "Supabase Auth & Google login",
          "Protected frontend & backend routes",
          "Home workouts exercise library (search, categories, difficulty, search/filter, favorites)",
          "Workout programs (Beginner, Intermediate, Pro)",
          "BMI calculator",
          "Water intake tracking",
          "Sleep tracking"
        ],
        inProgress: [
          "Weight tracking dashboard",
          "Active home workouts tracking",
          "Progress visualization with Recharts"
        ],
        planned: [
          "Daily routines schedule",
          "Workout goals setup (weight loss, muscle gain, strength, endurance)"
        ]
      }
    },
    {
      title: "IntelliSlide AI",
      description: "AI-powered presentation builder that converts textbook/PDF content into structured educational presentation slides. Tailored for students to quickly synthesize study material.",
      techStack: [
        "React", "Vite", "Tailwind CSS", "Framer Motion",
        "Flask", "Python", "PyMuPDF", "python-pptx", "Groq API (Llama models)"
      ],
      role: "End-to-end design, API integration, presentation generation scripting, and PDF parsing implementation.",
      badge: "In Progress",
      listFeatures: [
        "PDF upload & layout text extraction",
        "Unit/textbook-based content processing & outline detection",
        "AI-generated slide structure with customized slide counts",
        "Automated PPTX slide deck generation and download",
        "OCR fallback support for scanned/printed textbook content"
      ],
      challenges: [
        "PDF layout text extraction (removing headers, footers, and retaining semantic order)",
        "Chapter/unit boundary detection in large textbook PDFs",
        "OCR fallback implementation on low-resolution scanned pages",
        "Managing LLM API token rate limits and chunking large text units",
        "Structuring and exporting hierarchical presentation decks via python-pptx"
      ]
    }
  ],
  academicProjects: [
    {
      title: "Bus Reservation System",
      description: "Database management system designed to coordinate bus scheduling, passenger tickets booking, route networks, and operations management.",
      techStack: ["MySQL", "MySQL Workbench"],
      badge: "Academic",
      listFeatures: [
        "Relational database schema with primary and foreign key constraints",
        "Entity-Relationship diagrams modeling route and bus schedules",
        "SQL queries managing ticket availability, routes bookings, and transaction audits"
      ]
    }
  ],
  experience: [
    {
      title: "HydraHacks 2025",
      team: "TechTitans",
      role: "Orchestrator / Solver B",
      description: "Designed and built an automated AI-agent orchestrator workflow to generate, route, compare, and validate solutions to complex problems.",
      tech: ["n8n", "LLM APIs", "AI Agents", "Webhooks", "Workflow Automation", "Validation Logic", "JSON handling"],
      achievements: [
        "Orchestrated multi-agent solving paths inside n8n to generate solutions from different LLM models",
        "Configured validator agents comparing and filtering outputs to store verified JSON responses",
        "Utilized webhooks for automated event trigger handling across solvers"
      ]
    }
  ],
  certifications: [
    {
      title: "AI Foundations",
      issuer: "OpenAI",
      category: "Artificial Intelligence",
      year: "",
      pdfPath: "/certificates/ai-foundations.pdf"
    },
    {
      title: "Applied AI Foundations",
      issuer: "OpenAI",
      category: "Artificial Intelligence",
      year: "",
      pdfPath: "/certificates/applied-ai-foundations.pdf"
    },
    {
      title: "Agents and Workflows",
      issuer: "OpenAI",
      category: "AI & Automation",
      year: "",
      pdfPath: "/certificates/agents-and-workflows.pdf"
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco",
      category: "Python",
      year: "",
      pdfPath: "/certificates/python-essentials-1.pdf"
    },
    {
      title: "Python Essentials 2",
      issuer: "Cisco",
      category: "Python",
      year: "",
      pdfPath: "/certificates/python-essentials-2.pdf"
    },
    {
      title: "IBM Watson Studio",
      issuer: "IBM",
      category: "AI & Cloud",
      year: "",
      pdfPath: "/certificates/ibm-watson-studio.pdf"
    },
    {
      title: "Watson Services — Rapid Development for AI",
      issuer: "IBM",
      category: "Artificial Intelligence",
      year: "",
      pdfPath: "/certificates/watson-services-rapid-dev.pdf"
    }
  ],
  education: {
    degree: "BCA (Bachelor of Computer Applications)",
    institution: "Soundarya Institute of Management and Science",
    location: "Bangalore, Karnataka, India"
  }
};
