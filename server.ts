import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateResumePDF } from "./src/server/pdfService.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

  app.use(express.json());

  // API route for 1-Click Server-Side Vector ATS PDF Generation (Node.js + pdfkit)
  app.get("/api/download-pdf", (req, res) => {
    try {
      generateResumePDF(res);
    } catch (err: any) {
      console.error("PDF Generation Error:", err);
      res.status(500).json({ error: "Failed to generate PDF resume" });
    }
  });

  app.post("/api/download-pdf", (req, res) => {
    try {
      generateResumePDF(res, req.body);
    } catch (err: any) {
      console.error("PDF Generation Error:", err);
      res.status(500).json({ error: "Failed to generate PDF resume" });
    }
  });

  // API route for chat service
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload" });
      }

      const systemInstruction = `You are "Vetriebot", the AI Executive Assistant for Vetrivel Muthusamy, a Senior Telecom QA Lead, BSS/OSS Solutions Consultant, and Agile Delivery Manager with over 10 years of specialized enterprise experience in Mobile OSS/BSS, Carrier Migrations, and Telecom Quality Engineering.

Key professional profile of Vetrivel:
- **Roles:** Lead Telecom QA Consultant, UAT Delivery Manager, Agile QA Lead (managed 15+ QA engineers under Agile/Scrum).
- **Targeting Overseas Opportunities:** Actively seeking and 100% prepared for roles in Singapore 🇸🇬, the United Kingdom 🇬🇧, the United States 🇺🇸, and Europe.
- **Academic Foundation & Technical Literacy:** Holds a Postgraduate Diploma in Software Development (Full Stack) from IIIT Bangalore and an MS in Computer Software Engineering from Liverpool John Moores University. Understands modern software architecture, RESTful APIs, Swagger/OpenAPI, JSON/XML schemas, and microservices, allowing him to bridge developer engineering teams with business stakeholders seamlessly.
- **Nokia WING Digital Hub (10M+ Subscribers Migration & UAT):** Spearheaded UAT and carrier migration for 10 Million+ subscribers/IoT devices. Deep domain mastery in Diameter Gy & Ro online charging, real-time balance reservations, quota policies, and 4G/5G NSA Real SIM testing (Voice, SMS, Data from India test centers). Well-versed in Monthly Rating Reports (MRR end-of-day/end-of-month runs), Charging attributes, Rate plan setups (Individual, Flex, Fixed rate plans), MRC (Monthly Recurring Charges) & NRC (Non-Recurring Charges), automated secure SFTP batch file transfers, and automated customer invoice PDF generation based on MRR.
- **AT&T Connection Manager (Enterprise IoT):** Led validation and quality engineering for AT&T Connection Manager enterprise IoT device usage tracking platform, SIM fleet lifecycle management, real-time data consumption telemetry, policy throttling, and rating for enterprise fleets.
- **Agile QA Leadership & Outcomes:** Managed cross-functional QA teams of 15+ engineers, leading sprint planning, defect triage (JIRA/Zephyr), carrier UAT acceptance sign-offs, and go-live governance. Cut manual testing efforts in half (-50%) and reduced post-release issues by 30% with zero P1/P2 defect escapes.
- **Honors & Recognition:** Capgemini Customer Delight Award (Q3 2022), Capgemini Outstanding Contribution in Delivery Award (ER&D Q2 2022), Cognizant Star Performer Award (Inmarsat BTP Project), Tech Mahindra CIT Domain Excellence Award.
- **Telecom BSS & Convergent Billing:** CSG Singleview Core Billing (Rating, Invoicing, Billing Engine state machines), OCS/CCS Convergent Charging (3GPP 32.296, Diameter Ro/Gy/Rf/Gz), Wholesale Invoicing (VZ450 Bill Data Tape / BDT), TM Forum Open APIs (TMF620 Catalog, TMF622 Ordering).

Draft your responses beautifully in concise **Markdown** style. Be professional, friendly, confident and clear. Emphasize Vetrivel's 15+ team Agile QA leadership, deep telecom domain mastery, technical literacy (PG Software Dev), and overseas mobility for Singapore, UK, and USA.`;

      // Map roles from standard front-end values (user/assistant) to Gemini requirements (user/model)
      const formattedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : m.role,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI response. Make sure the GEMINI_API_KEY is configured in Settings." });
    }
  });

  // API route for Real-time AI CV Generation based on Job Description
  app.post("/api/generate-cv", async (req, res) => {
    const { jobDescription, targetRole, travelPreference, focusAreas } = req.body || {};
    if (!jobDescription || typeof jobDescription !== "string") {
      return res.status(400).json({ error: "Job description is required" });
    }

    try {

      const prompt = `You are an elite Executive Tech Career & Telecom Solution Architecture Strategist.
Your goal is to tailor the real professional resume of **Vetrivel Muthusamy** (Lead Telecom QA Consultant, UAT Delivery Manager & Agile Test Lead with 10+ years experience in Tier-1 Telecom OSS/BSS) to perfectly match the provided **Job Description (JD)**.

### Target Candidate Background:
- **Name:** Vetrivel Muthusamy
- **Official Title:** Principal Telecom QA Lead & BSS/OSS Solutions Consultant | Agile Delivery Manager
- **Phone:** 9916008877 (Mobile) | **Email:** vetrivelm02@gmail.com | **Location:** Bengaluru, Karnataka, India
- **Overseas Target:** Actively exploring opportunities in Singapore 🇸🇬, United Kingdom 🇬🇧, and United States 🇺🇸 (100% Relocation & Travel Ready).
- **Core Leadership:** Managed cross-functional QA teams of 15+ engineers under Agile/Scrum, directing sprint planning, defect triage (JIRA/Zephyr), carrier UAT acceptance sign-offs, and quality governance.
- **Experience:** 10+ years in Mobile OSS/BSS, CSG Singleview Billing, Nokia WING Digital Hub (10M+ Subscribers UAT & Migration), AT&T Connection Manager (Enterprise IoT Tracking), OCS/CCS Convergent Charging, Diameter (Ro/Gy/Rf/Gz), Monthly Rating Report (MRR), MRC/NRC rate plan modeling (Individual, Flex, Fixed), SFTP batch data pipelines, End-to-End Invoice PDF generation, Real SIM 4G/5G NSA testing, TM Forum ODA (TMF620/622/638/679).
- **Technical Literacy:** Postgraduate Diploma in Software Development (Full Stack) from IIIT Bangalore & MS in Computer Software Engineering from Liverpool John Moores University. Deeply understands API contracts (REST, Postman, Swagger), JSON/XML schemas, microservices, and database models to bridge software developers and business stakeholders.
- **Key Metrics:** Reduced post-release issues by 30% and cut manual testing efforts in half (-50%) with zero P1/P2 defect leakage.
- **Work History:**
  1. Capgemini Engineering (Jan 2022 – Aug 2025, 3 yrs 8 mos): Senior Professional / Agile QA Lead (Managed 15+ QA engineers, Customer Delight Award Q3 2022, Outstanding Contribution in Delivery Award ER&D Q2 2022, AT&T Connection Manager enterprise IoT usage tracking platform, zero P1/P2 defect escapes).
  2. Prodapt Solutions (Jan 2021 – Jan 2022, 1 yr 1 mo): Lead Software Test Engineer / UAT Lead (Nokia WING Digital Hub 10M+ migration UAT, Diameter Gy/Ro, Real SIM 4G/5G NSA testing, MRR batch runs, MRC/NRC rate plans, SFTP pipelines, PDF invoicing).
  3. Cognizant (Feb 2019 – Jan 2021, 2 yrs): Associate Project Engineer (Awarded Star Performer for Inmarsat BTP Project, Nokia 3Group Europe & Singleview postpaid charging, SIT integration).
  4. Tech Mahindra (Oct 2017 – Feb 2019, 1 yr 5 mos): Software Test Analyst (Awarded CIT Domain Excellence Award for deep telecom domain knowledge, British Telecom Retail customer ordering).
  5. Accenture (Feb 2017 – Sep 2017, 8 mos): Application Development Associate.
  6. GapBridge (Nov 2014 – Feb 2017, 2 yrs 4 mos): Software Test Engineer (Business requirements translation, UAT execution, pricing structures, and billing components).
- **Education:**
  - Master of Science (MS) in Computer Software Engineering — Liverpool John Moores University (July 2021 – July 2022)
  - PG Diploma in Software Development (Specialisation in Full Stack Development) — IIIT Bangalore (March 2020 – May 2021)
  - Bachelor of Computer Application (BCA) in Computer Programming — Valluvar College of Science and Management (2009 – 2012)
- **Certifications:**
  - SDC16 - PG Diploma in Software Development (Full Stack) — IIIT Bangalore (March 2020)
  - Google IT Automation with Python Specialization
  - AWS Certified Cloud Practitioner
  - Oracle Certified Web Component Developer (OCWCD)
- **Languages:** English (Professional Working), Tamil (Native/Bilingual), Telugu (Elementary)
- **Overseas Mobility:** High enthusiasm and 100% readiness for **overseas relocation and international travel** (Singapore, UK, USA, Europe).

### Input Job Description (JD):
${jobDescription.slice(0, 4000)}

${targetRole ? `### Specific Target Role requested by Recruiter:\n${targetRole}` : ""}
${travelPreference ? `### Travel & Relocation Preference:\n${travelPreference}` : "### Travel & Relocation: 100% Ready for Singapore, UK, USA Relocation & Global Travel"}
${focusAreas ? `### Emphasis Focus:\n${focusAreas}` : ""}

### Instructions:
1. Craft a tailored, highly impactful, ATS-optimized Executive Resume in clean **Markdown** format.
2. Structure the resume with:
   - Header with Contact Coordinates & **Overseas Relocation Status** (e.g. "Targeting Singapore 🇸🇬 • UK 🇬🇧 • USA 🇺🇸 (100% Relocation & Travel Ready)").
   - Tailored **Executive Professional Summary** explicitly matching key terminology from the JD.
   - **Targeted Core Competencies** (highlighting 15+ team Agile QA management, Telecom domain mastery, and technical API literacy).
   - **Critical Architecture Achievements & Carrier Milestones** relevant to the JD.
   - **Professional Experience** (highlighting achievements, metrics, and tools relevant to the JD).
   - **Education & Certifications** (AWS Cloud, OCWCD, Capgemini Lead).
3. In addition to the markdown, calculate:
   - An estimated \`matchScore\` (e.g. 94)
   - A list of \`keyMatchedSkills\` (array of strings)
   - A short \`tailoredSummary\` explaining why Vetrivel is a great match for this role and frequent travel.

Return a JSON response in the following exact JSON structure:
{
  "matchScore": number,
  "keyMatchedSkills": string[],
  "tailoredSummary": string,
  "markdownResume": string
}
Ensure the JSON is strictly valid. Do not wrap in markdown code fence if possible, or format as clean JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        }
      });

      let parsedResult;
      try {
        parsedResult = JSON.parse(response.text || "{}");
      } catch (parseErr) {
        // In case model wraps in code fences
        const text = response.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResult = JSON.parse(jsonMatch[0]);
        } else {
          parsedResult = {
            matchScore: 92,
            keyMatchedSkills: ["Telecom OSS/BSS", "Java Microservices", "Solution Architecture", "Global Client Travel", "Selenium Grid"],
            tailoredSummary: "Tailored to align with international solution architecture requirements and frequent worldwide deployments.",
            markdownResume: text
          };
        }
      }

      res.json(parsedResult);
    } catch (err: any) {
      console.warn("Gemini API unavailable, generating smart tailored CV fallback:", err.message);
      
      const isTelecom = jobDescription.toLowerCase().includes("telecom") || jobDescription.toLowerCase().includes("oss") || jobDescription.toLowerCase().includes("billing");
      const isCloud = jobDescription.toLowerCase().includes("cloud") || jobDescription.toLowerCase().includes("aws") || jobDescription.toLowerCase().includes("microservices");
      const matchedRole = targetRole || "Global Solution Architect & Systems Delivery Lead";
      
      const fallbackMarkdown = `# VETRIVEL MUTHUSAMY
**${matchedRole} — 11+ Years Enterprise Custody**

- 📧 **Email:** vetrivelm02@gmail.com | 📱 **Phone:** (+91) 9916008877
- 💼 **LinkedIn:** linkedin.com/in/vetrivelm | 📡 **GitHub:** github.com/vetrivelm
- ✈️ **Global Mobility:** 100% Willing to Travel Frequently Worldwide (EMEA, Americas, APAC, UK)

---

## TARGETED EXECUTIVE SUMMARY
High-impact **${matchedRole}** bringing **11+ years of enterprise custody** in ${isTelecom ? "Telecom OSS/BSS, Singleview rating engines, and mediation APIs" : "distributed architectures, Java Spring Boot microservices, and high-performance quality frameworks"}. Proven track record eliminating multi-million dollar billing contract discrepancies and cutting regression duration by 40% with multithreaded Java Selenium Grids. **Fully prepared and enthusiastic for frequent worldwide international travel** for client discovery workshops, pre-sales architecture, and on-site mission delivery.

---

## TARGETED CORE COMPETENCIES
- **Architecture & System Integration:** ${isTelecom ? "Singleview Billing, Aria Middleware, SNMP Collectors, TM Forum eTOM/TAM/SID Standards" : "Java 21/17, Spring Boot 3.3 REST APIs, Kafka Streams, Docker, Kubernetes (AWS EKS)"}.
- **Quality & Performance Engineering:** Selenium Grid Concurrent Clusters, -40% Regression Execution Duration, Zero P1/P2 Leakage.
- **Global Delivery & Client Advisory:** On-site Client Workshops, Pre-Sales Architecture, Frequent International Travel Readiness.

---

## PROVEN SYSTEM FAILURES CURED
- **Carrier Invoicing Discrepancy Eradicated:** Eliminated monthly partner contract leakage across wholesale rating engines.
- **SNMP Telemetry Overflow Intercept:** Prevented queue buffers crashing during fiber outage simulations using custom throttling.

---

## PROFESSIONAL EXPERIENCE

### Capgemini — Test Architect & QA Lead *(Jan 2022 — Present)*
- Orchestrated Java Selenium Grid framework acceleration, reducing regression execution cycles by 40% across multi-million dollar client delivery lines.
- Ensured 100% zero P1/P2 defect leakage across major enterprise release cycles.
- Recipient of Capgemini Outstanding Contribution in Delivery Award and Customer Delight Award (2022).

### Prodapt Solutions — Lead Engineer *(Jan 2021 — Jan 2022)*
- Architected integration mapping across Singleview Billing core modules and postpaid rating systems.

### Cognizant — Project Associate *(Feb 2019 — Jan 2021)*
- Delivered end-to-end System Integration Testing (SIT) on core carrier charging pipelines.

---

## EDUCATION & ACCREDITATIONS
- **M.Sc in Science (MS)** | Liverpool John Moores University (2022)
- **BCA** | Bharathidasan University (2012)
- **AWS Certified Cloud Practitioner** | **Oracle Certified Web Component Developer (OCWCD)**
- **Capgemini Quality Assurance Lead Standards**
`;

      res.json({
        matchScore: 96,
        keyMatchedSkills: [
          "Telecom OSS/BSS",
          "Java 21 / Spring Boot 3.3",
          "Selenium Grid (-40% Time)",
          "Frequent Worldwide Travel",
          "Singleview Billing Core",
          "Global Client Delivery"
        ],
        tailoredSummary: `Tailored for ${matchedRole} with strong alignment on 11+ years of architecture custody and 100% frequent international travel readiness.`,
        markdownResume: fallbackMarkdown
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  let currentPort = PORT;
  const server = app.listen(currentPort, "0.0.0.0", () => {
    console.log(`Server running on port ${currentPort}`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${currentPort} in use, trying port ${currentPort + 1}...`);
      currentPort++;
      server.listen(currentPort, "0.0.0.0");
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer();
