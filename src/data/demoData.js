localStorage.clear()

export const employees = [
  {
    id: 1,
    name: "Ramesh",
    email: "e1@ems",
    password: "abcd",
    tasks: [
      {
        status: "new",
        title: "Update website",
        description: "Revamp company homepage for summer sale.",
        date: "2025-07-02",
        category: "frontend",
      },
      {
        status: "completed",
        title: "Fix login bug",
        description: "Resolve the token expiration issue.",
        date: "2025-06-28",
        category: "backend",
      },
      {
        status: "completed",
        title: "Design newsletter",
        description: "Create a monthly newsletter layout.",
        date: "2025-07-01",
        category: "design",
      },
      {
        status: "completed",
        title: "Client feedback form",
        description: "Integrate feedback widget in footer.",
        date: "2025-06-25",
        category: "frontend",
      },
    ],
  },
  {
    id: 2,
    name: "Suresh",
    email: "e2@ems",
    password: "abcd",
    tasks: [
      {
        status: "new",
        title: "Write API docs",
        description: "Document all v2 endpoints.",
        date: "2025-07-03",
        category: "documentation",
      },
      {
        status: "completed",
        title: "Add user roles",
        description: "Implement RBAC on admin panel.",
        date: "2025-07-02",
        category: "backend",
      },
      {
        status: "completed",
        title: "Build login page",
        description: "Create a new responsive login page.",
        date: "2025-06-27",
        category: "frontend",
      },
    ],
  },
  {
    id: 3,
    name: "Mahesh",
    email: "e3@ems",
    password: "abcd",
    tasks: [
      {
        status: "new",
        title: "Database indexing",
        description: "Optimize query speed using proper indexing.",
        date: "2025-07-02",
        category: "database",
      },
      {
        status: "completed",
        title: "Security audit",
        description: "Review the app for XSS and SQL injections.",
        date: "2025-07-01",
        category: "security",
      },
      {
        status: "completed",
        title: "Dark mode",
        description: "Implement global theme toggle.",
        date: "2025-06-29",
        category: "UI",
      },
    ],
  },
  {
    id: 4,
    name: "Lakshmi",
    email: "e4@ems",
    password: "abcd",
    tasks: [
      {
        status: "completed",
        title: "SEO Audit",
        description: "Analyze on-page SEO and keywords.",
        date: "2025-06-28",
        category: "marketing",
      },
      {
        status: "completed",
        title: "Team scheduling",
        description: "Prepare shift calendar for July.",
        date: "2025-06-30",
        category: "admin",
      },
    ],
  },
  {
    id: 5,
    name: "Priya",
    email: "e5@ems",
    password: "abcd",
    tasks: [
      {
        status: "new",
        title: "Mobile responsiveness",
        description: "Fix layout on small devices.",
        date: "2025-07-01",
        category: "frontend",
      },
      {
        status: "new",
        title: "Competitor analysis",
        description: "Compare top 5 market rivals.",
        date: "2025-07-02",
        category: "research",
      },
    ],
  },
];

export const admin = {
  id: "A1",
  name: "Admin",
  email: "admin@ems",
  password: "admin123",
};