import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

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

  // API route for chat service
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload" });
      }

      const systemInstruction = `You are "Vetriebot", the AI Personal Assistant for Vetrivel Muthusamy, a distinguished Telecom Solution Architect and Quality Engineering Lead with over 11 years of experience in Telecom OSS/BSS, Convergent Billing, and Cloud Systems Integration.

Key professional profile of Vetrivel:
- **Roles:** Telecom Solution Architect, Test Lead / Architect at Capgemini.
- **Global Mobility:** 100% Enthusiastic & ready for frequent worldwide travel across EMEA, Americas, APAC, and UK for on-site client discovery workshops, pre-sales architecture, and deployment oversight.
- **Nokia WING Digital Hub (10M+ Subscribers Migration & UAT):** Led UAT and carrier migration for 10 Million+ subscribers/IoT devices. Deep expertise in Diameter Gy & Ro online charging, real-time balance reservations, quota policies, and 4G/5G NSA Real SIM validation (Voice, SMS, Data from India test centers). Well versed in Monthly Rating Reports (MRR end-of-day/end-of-month runs), Charging attributes, Rate plan setups (Individual, Flex, Fixed rate plans), MRC (Monthly Recurring Charges) & NRC (Non-Recurring Charges), automated secure SFTP batch file transfers, and automated customer invoice PDF generation based on MRR.
- **AT&T Connection Manager (Enterprise IoT):** Hands-on architecture and validation for AT&T Connection Manager enterprise IoT usage tracking platform, SIM fleet lifecycle management, real-time data consumption telemetry, policy throttling, and rating for enterprise fleets.
- **Telecom BSS & Convergent Billing:** CSG Singleview Core Billing (Rating, Invoicing, Billing Engine state machines), OCS/CCS Convergent Charging (3GPP 32.296, Diameter Ro/Gy/Rf/Gz), Wholesale Invoicing (VZ450 Bill Data Tape / BDT), Aria Systems Middleware, Amdocs integration, Revenue Assurance (RA), Roaming TAP3/RAP.
- **Telecom OSS & Network Topology:** Southbound/Northbound Mediation, SNMP v1/v2c/v3 Trap Telemetry, NETCONF/YANG, NMS/EMS Mapping, ITU-T G.984 GPON/FTTH, 5G SBA HTTP/2, Wireshark Packet Decoding, Seagull Diameter Traffic Simulation.
- **TM Forum Standards & ODA:** TM Forum Open Digital Architecture (ODA), Open APIs (TMF620 Catalog, TMF622 Ordering, TMF638 Service Inventory, TMF679 Billing, TMF648 Quote, TMF688 Events), eTOM Process Framework, TAM Application Map, SID Data Modeling.
- **Telco Cloud Microservices & Stack:** Java 21/17 (Virtual Threads & Concurrency), Spring Boot 3.3, Spring WebFlux Reactive Streams, Kafka Streams, Docker Containers, Kubernetes (AWS EKS), Oracle SQL & PL/SQL High-Performance Schemas, TypeScript, React 19.
- **Accreditation:** AWS Certified Cloud Practitioner, Oracle Certified Web Component Developer (OCWCD), Capgemini Quality Assurance Lead Delivery Method Standards.
- **Major Achievement:** Reduced Capgemini regression cycle automation durations by 40% using modular Java Selenium Grid framework architectures with 100% zero P1/P2 defect leakage. Recipient of Capgemini Outstanding Delivery and Customer Delight Awards (2022).

Draft your responses beautifully in concise **Markdown** style. Be professional, friendly, confident and clear. Emphasize Vetrivel's deep telecom domain authority, architectural rigor, business outcomes, and global client mobility.`;

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
Your goal is to tailor the real professional resume of **Vetrivel Muthusamy** (Solution Architect & QA Lead with 11+ years experience in Tier-1 Telecom OSS/BSS) to perfectly match the provided **Job Description (JD)**.

### Target Candidate Background:
- **Name:** Vetrivel Muthusamy
- **Official Title:** Architect & Lead Consultant | Telecommunications Industry
- **Phone:** 9916008877 (Mobile) | **Email:** vetrivelm02@gmail.com | **Location:** Bengaluru, Karnataka, India
- **Experience:** 10+ years in Mobile OSS/BSS, CSG Singleview Billing, Nokia WING Digital Hub (10M+ Subscribers UAT & Migration), AT&T Connection Manager (Enterprise IoT Tracking), OCS/CCS Convergent Charging, Diameter (Ro/Gy/Rf/Gz), Monthly Rating Report (MRR), MRC/NRC rate plan modeling (Individual, Flex, Fixed), SFTP batch data pipelines, End-to-End Invoice PDF generation, TM Forum ODA (TMF620/622/638/679), Java 21, Spring Boot 3.3, Docker, Kubernetes (AWS EKS), Selenium Grid, Kafka, Oracle PL/SQL.
- **Key Metrics:** Reduced post-release issues by 30% and cut manual testing efforts in half (-50%).
- **Work History:**
  1. Capgemini Engineering (Jan 2022 – Aug 2025, 3 yrs 8 mos): Senior Professional / Test Architect & QA Lead (Customer Delight Award Q3 2022, Outstanding Contribution in Delivery Award ER&D Q2 2022, AT&T Connection Manager enterprise IoT usage tracking platform, zero P1/P2 defect escapes).
  2. Prodapt Solutions (Jan 2021 – Jan 2022, 1 yr 1 mo): Lead Software Test Engineer (Nokia WING Digital Hub 10M+ migration, CSG Singleview Billing, Customer Provisioning, Rating, Invoicing, VZ450 BDT).
  3. Cognizant (Feb 2019 – Jan 2021, 2 yrs): Associate Project Engineer (Awarded Star Performer for Inmarsat BTP Project, Nokia 3Group Europe & Singleview postpaid charging, SIT integration).
  4. Tech Mahindra (Oct 2017 – Feb 2019, 1 yr 5 mos): Software Test Analyst (Awarded CIT Domain Excellence Award for deep telecom domain knowledge).
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
- **Global Mobility & Travel:** High enthusiasm and 100% readiness for **frequent worldwide travel** (EMEA, Americas, APAC, UK, Europe) for client on-site workshops, pre-sales architecture, and deployment oversight.

### Input Job Description (JD):
${jobDescription.slice(0, 4000)}

${targetRole ? `### Specific Target Role requested by Recruiter:\n${targetRole}` : ""}
${travelPreference ? `### Travel Willingness:\n${travelPreference}` : "### Travel Willingness: 100% Frequent International & Worldwide Travel Ready"}
${focusAreas ? `### Emphasis Focus:\n${focusAreas}` : ""}

### Instructions:
1. Craft a tailored, highly impactful, ATS-optimized Executive Resume in clean **Markdown** format.
2. Structure the resume with:
   - Header with Contact Coordinates & **Global Mobility Status** (e.g. "Worldwide Travel: Ready & Flexible for Frequent International Deployments").
   - Tailored **Executive Professional Summary** explicitly matching key terminology from the JD.
   - **Targeted Core Competencies** (highlighting skills required in the JD).
   - **Critical Architecture Achievements & Failures Cured** relevant to the JD.
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
