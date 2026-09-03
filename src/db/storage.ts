import { Project, BlogPost, ContactMessage } from "../types";

// Seed data for projects
const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Verizon Prime Biller Wholesale & Mediation",
    description: "Led core BSS billing integration, VZ450 Bill Data Tape (BDT) validation, and mediation checking for Verizon Wholesale and Tier-1 carrier partners with zero revenue leakage.",
    category: "Telecom OSS/BSS",
    icon: "📡",
    techs: ["CSG Singleview", "VZ450 / BDT", "Diameter Rf/Gz", "Spring Boot 3", "Oracle PL/SQL", "TM Forum SID"],
    impact: "Eliminated wholesale contract rate discrepancies, protecting millions in multi-carrier settlements.",
    createdAt: "2024-03-15T08:00:00Z"
  },
  {
    id: "proj-2",
    title: "Capgemini Enterprise Regression & Protocol Grid",
    description: "Designed and engineered a scalable multithreaded Java 21 Selenium Grid Docker cluster with protocol-level validation, standardizing enterprise delivery frameworks.",
    category: "Test Architecture",
    icon: "⚙️",
    techs: ["Java 21", "Selenium Grid", "5G/4G Mocks", "Spring Boot", "Docker", "TestNG", "GitLab CI"],
    impact: "Accelerated regression cycle durations by 40% with zero P1/P2 defect escapes to production.",
    createdAt: "2024-01-10T14:15:00Z"
  },
  {
    id: "proj-3",
    title: "Inmarsat Convergent Billing & OCS Transformation",
    description: "Architected rating engine integration and mediation over CSG International Singleview, orchestrating real-time balance reservations and wholesale billing migrations.",
    category: "Telecom OSS/BSS",
    icon: "💰",
    techs: ["CSG Singleview", "Diameter Ro/Gy", "Aria Middleware", "Revenue Assurance", "SIT Testing"],
    impact: "Migrated $4M+ in active wholesale accounts with seamless partner cutover and zero SLA breaches.",
    createdAt: "2023-11-20T10:30:00Z"
  },
  {
    id: "proj-4",
    title: "BT Retail Core Mobile Ordering (TM Forum ODA)",
    description: "Conducted exhaustive end-to-end UAT verification and functional specification architecture for BT Group's employee discount and retail customer ordering systems.",
    category: "Telecom OSS/BSS",
    icon: "📱",
    techs: ["TMF622 Ordering", "TMF620 Catalog", "E-commerce", "HP ALM", "SOAP/REST Mocks"],
    impact: "Delivered brand new retail features to live production databases without severe P1/P2 defects.",
    createdAt: "2024-05-01T09:00:00Z"
  },
  {
    id: "proj-5",
    title: "Nokia WING Digital Hub (10M+ Subs UAT & Migration)",
    description: "Led UAT and migration for 10 Million+ subscribers on Nokia WING (Worldwide IoT Network Grid) Digital Hub. Spearheaded Diameter Gy & Ro online charging, 4G LTE & 5G NSA Real SIMs (Voice, SMS, Data from India test center), Monthly Rating Report (MRR end-of-day runs), Individual/Flex/Fixed rate plan configurations, MRC & NRC charges, automated SFTP batch file transfer pipelines, and automated Invoice PDF generation.",
    category: "Telecom OSS/BSS",
    icon: "🌐",
    techs: ["Nokia WING", "Diameter Gy/Ro", "4G & 5G NSA SIMs", "MRR Rating", "MRC/NRC Charges", "SFTP Pipelines", "Invoice PDF Gen"],
    impact: "Migrated 10M+ active IoT/cellular subscriber accounts with zero revenue leakage and flawless bill run generation.",
    createdAt: "2024-06-15T11:00:00Z"
  },
  {
    id: "proj-6",
    title: "AT&T Connection Manager: Enterprise IoT Telemetry & Rating",
    description: "Enterprise IoT device usage tracking and rating platform. Architected real-time SIM fleet telemetry ingestion, policy-based quota throttling, automated usage threshold alarms, and wholesale enterprise billing mediation.",
    category: "Telecom OSS/BSS",
    icon: "📡",
    techs: ["AT&T IoT Core", "SIM Lifecycle API", "Telemetry Ingestion", "Policy Throttling", "Enterprise Rating", "Spring Boot 3"],
    impact: "Provides real-time usage visibility and zero-overage billing controls across thousands of enterprise IoT fleets.",
    createdAt: "2024-06-25T14:00:00Z"
  },
  {
    id: "proj-fs-1",
    title: "telco-oda-api-gateway",
    description: "Open-source full-stack TM Forum ODA Open API Gateway (TMF620, TMF622, TMF638, TMF679) with live interactive Swagger sandbox, Kafka event streams, and Docker Compose orchestration.",
    category: "Full-Stack & GitHub",
    icon: "🚀",
    techs: ["React 19", "TypeScript", "Java 21", "Spring Boot 3.3", "Kafka", "Docker", "TM Forum ODA"],
    impact: "Production-ready reference microservice architecture for rapid TMF API compliance testing.",
    githubUrl: "https://github.com/vetrivel-mpv",
    stars: 42,
    forks: 14,
    createdAt: "2024-07-01T10:00:00Z"
  },
  {
    id: "proj-fs-2",
    title: "selenium-grid-cloud-orchestrator",
    description: "Distributed Cloud Test Architecture and dynamic Selenium Grid Docker node auto-scaler reducing regression execution run-times by 40% with automated visual diff verification and multi-threaded execution.",
    category: "Full-Stack & GitHub",
    icon: "⚡",
    techs: ["Java 21", "Selenium Grid", "Docker Compose", "AWS EKS", "TestNG", "Spring WebFlux"],
    impact: "Containerized test cluster capable of running 50+ concurrent browser threads with 0 flakiness.",
    githubUrl: "https://github.com/vetrivel-mpv",
    stars: 68,
    forks: 21,
    createdAt: "2024-08-10T14:00:00Z"
  },
  {
    id: "proj-fs-3",
    title: "convergent-billing-mediation-engine",
    description: "High-throughput CDR batch mediation and rating engine processing 15,000+ TPS with zero revenue leakage, real-time balance reservations, and automated VZ450 Bill Data Tape (BDT) generation.",
    category: "Full-Stack & GitHub",
    icon: "💎",
    techs: ["Java 21", "Spring Boot 3", "Diameter Ro/Gy", "Oracle PL/SQL", "Kafka Streams", "Redis"],
    impact: "Simulates Tier-1 carrier charging pipelines with real-time balance reservations and wholesale settlement.",
    githubUrl: "https://github.com/vetrivel-mpv",
    stars: 35,
    forks: 9,
    createdAt: "2024-08-20T09:30:00Z"
  },
  {
    id: "proj-fs-4",
    title: "ai-resume-intelligence-suite",
    description: "Full-stack AI Job Description analyzer and executive ATS resume generator built with React 19, TypeScript, Gemini AI 2.5 Flash, and Express.",
    category: "Full-Stack & GitHub",
    icon: "✨",
    techs: ["React 19", "Gemini AI", "Express", "TypeScript", "Tailwind CSS", "Vite"],
    impact: "Generates tailored executive CVs with real-time alignment scoring and markdown/PDF compilation.",
    githubUrl: "https://github.com/vetrivel-mpv",
    stars: 54,
    forks: 18,
    createdAt: "2024-09-01T12:00:00Z"
  }
];

// Seed data for blogs
const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "From QA to Solution Architecture: The Power of Systems Thinking",
    summary: "Why starting in Quality Assurance gives you the ultimate vantage point for designing bulletproof enterprise software architectures.",
    content: `## The Untapped Edge of QA-Born Architects

Many developers dream of transition into Solution Architecture, but some of the most resilient systems are built by those who started in **Quality Assurance**. Why? Because QA engineers don't just ask *"how do I write this function?"*—they ask *"how will this entire system break when scaled, pushed, and abused?"*

### 1. The Power of "System Archeology"
During my 11+ years in Telecom OSS/BSS, I spent years analyzing logs, tracking network interfaces, and decoding packet captures. When you spend that much time understanding the cracks in a system, you develop a "sixth sense" for robust system integration:
*   **Update-Gaps & Race Conditions**: In telemetry or billing systems, small delays are catastrophic.
*   **Dependency Cascades**: Knowing how single point of failures propagate.

### 2. Speaking Three Languages
To design elegant solution architectures, you must translate:
1.  **Business Logic** (What the client actually needs - TMForum eTOM models).
2.  **Engineering Capabilities** (How to deploy safely on cloud-native stacks).
3.  **Real-world Edge Cases** (What happens when networks drop or services timeout).

The modern **Solution Architect** must be a generalist with extreme domain depth. Quality is not an after-thought; it must be designed into the blueprint.`,
    category: "Architecture",
    readTime: "5 min read",
    createdAt: "2026-05-28T09:00:00Z",
    status: "published"
  },
  {
    id: "blog-2",
    title: "Designing for Infinite Resilience in Telecom OSS Platforms",
    summary: "Exploring fault tolerance, transaction isolation, and network management patterns based on a decade of validation.",
    content: `## Resilience in High-Phosphate Domains

In Telecom Operations Support Systems (OSS), "downtime" is not just a missing button—it means service disruptions for thousands of physical terminals.

### Core Architectural Pillars for OSS:
*   **Idempotency Over Everything**: Outage alarms and provisioning commands will be retried. If your endpoints aren't safely idempotent, you'll trigger duplicate orders or duplicate Billing events.
*   **Graceful Degeneration**: If the physical inventory layer (GIS database) is down, the monitoring system should still display cached topologies with a warning, rather than crashing with a HTTP 500.
*   **Rate-Limiting & Backpressure**: Using message queues to handle bulk bursts of telemetry signals during a storm.

Through my path as a Test Architect, I've seen that the best architectures are those that treat failures as standard operational conditions, not exceptions.`,
    category: "Telecom Insights",
    readTime: "7 min read",
    createdAt: "2026-06-01T14:20:00Z",
    status: "published"
  },
  {
    id: "blog-3",
    title: "Agile Systems Architecture: Bridging Technical Design to Real Business Value",
    summary: "How an agile, value-stream architecture mindset changes the way a Solution Architect designs technical blueprints around customer outcomes.",
    content: `## Bridging Technical Design to Real Business Value

A technically perfect architecture that doesn't deliver rapid business value is an operational bottleneck.

### Core Architectural Philosophy:
*   **Iterative Architecture**: Building minimal viable architectures (MVA) that adapt dynamically to carrier market needs rather than rigid big-bang waterfall rollouts.
*   **Value-Stream Mapping**: Identifying and eradicating architectural waste, latency overheads, and data mismatches across mediation tiers.
*   **Customer-Centric Interface Design**: Engineering robust APIs and telemetry contracts that directly solve real subscriber and carrier operational tasks.
*   **Global Cross-Team Alignment**: Leading distributed engineering squads across timezones with clarity, rapid sprint cadences, and zero defect leakage.

Aligning solution blueprints to high-priority business outcomes is the key to enterprise agility and global scale.`,
    category: "Architecture",
    readTime: "4 min read",
    createdAt: "2026-06-02T11:00:00Z",
    status: "published"
  }
];

// LocalStorage Helper Keys
const PROJECTS_KEY = "vetrivel_portfolio_projects_v5";
const BLOGS_KEY = "vetrivel_portfolio_blogs_v5";
const MESSAGES_KEY = "vetrivel_portfolio_messages";

export function getProjects(): Project[] {
  const data = localStorage.getItem(PROJECTS_KEY);
  if (!data || !data.includes("Verizon")) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getBlogs(): BlogPost[] {
  const data = localStorage.getItem(BLOGS_KEY);
  if (!data) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(INITIAL_BLOGS));
    return INITIAL_BLOGS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_BLOGS;
  }
}

export function saveBlogs(blogs: BlogPost[]) {
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
}

export function getMessages(): ContactMessage[] {
  const data = localStorage.getItem(MESSAGES_KEY);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function addMessage(message: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
  const messages = getMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  messages.unshift(newMessage); // newest first
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  return newMessage;
}

export function deleteMessage(id: string) {
  const messages = getMessages().filter(m => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function markMessageReplied(id: string) {
  const messages = getMessages().map(m => m.id === id ? { ...m, replied: true } : m);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}
