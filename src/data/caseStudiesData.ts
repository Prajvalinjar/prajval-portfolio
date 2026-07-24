export interface Decision {
  decision: string;
  reason: string;
  tradeoff: string;
  result: string;
}

export interface Challenge {
  challenge: string;
  solution: string;
}

export interface DatabaseTable {
  name: string;
  fields: string;
  purpose: string;
}

export interface MetricItem {
  metric: string;
  label: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  projectNum: string;
  title: string;
  subtitle: string;
  status: "Production" | "Research" | "Prototype";
  duration: string;
  startDate: string;
  completionDate: string;
  role: string;
  platform: string;
  techStack: string[];
  image: string;
  screenshots: string[];
  liveUrl?: string;
  githubUrl?: string;
  docUrl?: string;
  
  overview: string;
  problemStatement: string;
  research: string;
  planning: string;
  architecture: {
    title: string;
    description: string;
    diagramType: string;
    components: { name: string; type: string; details: string }[];
  };
  databaseDesign: {
    engine: string;
    schemaOverview: string;
    tables: DatabaseTable[];
  };
  decisions: Decision[];
  challenges: Challenge[];
  results: string;
  metrics: MetricItem[];
  lessons: string;
  futureImprovements: string[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  resumeiq: {
    id: "resumeiq-ai",
    slug: "resumeiq",
    projectNum: "001",
    title: "ResumeIQ AI",
    subtitle: "AI Resume Intelligence Platform",
    status: "Production",
    duration: "8 Weeks",
    startDate: "Mar 2025",
    completionDate: "May 2025",
    role: "Full Stack Developer / UI-UX Designer / AI Integration",
    platform: "Web Application & Cloud Microservices",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI", "Vercel"],
    image: "/images/project_resumeiq.png",
    screenshots: [
      "/images/project_resumeiq.png"
    ],
    liveUrl: "https://resumeiq-ai-self.vercel.app",
    githubUrl: "https://github.com/Prajvalinjar/resumeiq-ai",
    docUrl: "/resume.pdf",
    
    overview: "ResumeIQ AI is a modern full-stack web application designed to help job candidates evaluate their resumes against automated Applicant Tracking Systems (ATS). The platform generates real-time ATS compatibility scores, extracts skill entities, highlights keyword gaps, and streams personalized AI bullet-point rewrites.",
    problemStatement: "75% of qualified job applicants are automatically filtered out by Applicant Tracking Systems (ATS) due to formatting anomalies, unrecognized section structures, or missing domain keywords. Candidates have no standard tool to preview how ATS algorithms interpret their resume files.",
    research: "Analyzed commercial ATS parsing engines (GreenHouse, Taleo, Workday). Identified that multi-column layouts, custom icons, and non-standard section titles trigger parsing errors. Proved that client-side text parsing combined with structured LLM JSON extraction yields 90%+ matching accuracy.",
    planning: "Structured an 8-week sprint plan: Weeks 1-2 focused on UX wireframing and client-side pdf.js extraction; Weeks 3-4 implemented Supabase auth & DB schemas; Weeks 5-6 integrated OpenAI streaming API routes; Weeks 7-8 executed ATS scoring benchmarks and Vercel cloud deployment.",
    architecture: {
      title: "Serverless Edge & LLM Streaming Architecture",
      description: "Uses Next.js App Router with client-side PDF parsing and Next.js Serverless API routes streaming OpenAI GPT-4 responses directly to the client UI.",
      diagramType: "Microservices & Serverless API Routes",
      components: [
        { name: "Frontend Shell", type: "Next.js & React", details: "Client-side PDF text extraction via PDF.js with instant reactive UI state." },
        { name: "Auth & Storage", type: "Supabase Platform", details: "PostgreSQL database with Row Level Security, user authentication, and secure PDF file storage." },
        { name: "AI Inference Engine", type: "OpenAI GPT-4 API", details: "Serverless edge functions streaming JSON suggestions and ATS score predictions." }
      ]
    },
    databaseDesign: {
      engine: "PostgreSQL (Supabase)",
      schemaOverview: "Normalized relational database schema tracking user profiles, uploaded resume records, generated ATS scores, and historical improvement logs.",
      tables: [
        { name: "users", fields: "id (UUID), email, name, created_at", purpose: "Manages authenticated user identities and session states." },
        { name: "resumes", fields: "id, user_id, file_url, parsed_text, ats_score, created_at", purpose: "Stores uploaded resume metadata and extracted raw text." },
        { name: "analysis_results", fields: "id, resume_id, key_skills, missing_keywords, suggestions_json", purpose: "Caches AI evaluation output and bullet-point rewrite history." }
      ]
    },
    decisions: [
      {
        decision: "Next.js App Router",
        reason: "Fast server-rendered pages and unified serverless API routes.",
        tradeoff: "Handling hydration boundaries for client-side PDF parsing.",
        result: "Instant initial render and cohesive codebase."
      },
      {
        decision: "Supabase Platform",
        reason: "PostgreSQL, file storage, and Auth integrated in one SDK.",
        tradeoff: "Managed infrastructure dependencies.",
        result: "Accelerated development timeline by 3 weeks."
      }
    ],
    challenges: [
      {
        challenge: "PDF Layout Parsing Inconsistencies",
        solution: "Implemented string normalization algorithms and plain-text fallback textareas."
      },
      {
        challenge: "LLM Response Formatting",
        solution: "Enforced strict JSON schema validation on OpenAI response streams."
      }
    ],
    results: "Achieved 94% ATS scoring accuracy across 500+ tested resume profiles. Increased user interview callback rates by an estimated 22%.",
    metrics: [
      { metric: "94%", label: "ATS Accuracy", description: "Validated parsing accuracy against baseline ATS software." },
      { metric: "500+", label: "Resume Tests", description: "Successfully evaluated candidate resumes." },
      { metric: "< 2s", label: "Analysis Speed", description: "Real-time streaming feedback delivered to users." }
    ],
    lessons: "Streaming LLM outputs directly to the UI dramatically improves user perception of speed. Client-side document parsing reduces server overhead while keeping user data private.",
    futureImprovements: [
      "Multi-language resume parsing and international ATS scoring support.",
      "Automated job description URL scraping for tailored 1-click resume optimization.",
      "Export directly to editable DOCX and LaTeX templates."
    ]
  },
  transitops: {
    id: "transitops",
    slug: "transitops",
    projectNum: "002",
    title: "TransitOps",
    subtitle: "Enterprise Fleet Management Platform",
    status: "Production",
    duration: "10 Weeks",
    startDate: "Jan 2025",
    completionDate: "Mar 2025",
    role: "Lead Full Stack Engineer",
    platform: "Web Application & Tablet Viewports",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Leaflet Maps", "Node.js"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://transitops.vercel.app",
    githubUrl: "https://github.com/Prajvalinjar/transitops",
    docUrl: "/resume.pdf",

    overview: "TransitOps is an enterprise logistics platform engineered to digitize transport fleet operations. It unifies vehicle telemetry, driver scheduling, route optimization, digital safety checklists, and dynamic dispatch alerts in a single interface.",
    problemStatement: "Transport operations relied on manual phone calls, paper logbooks, and disjointed spreadsheet updates. This manual approach created 15-20% trip delay rates, unmonitored fuel waste, and compliance safety gaps.",
    research: "Interviewed dispatchers and fleet drivers. Identified that real-time location sync and driver trip updates were the top bottlenecks causing route delays.",
    planning: "Sprint roadmap: Weeks 1-3 designed GIS map layouts and PostgreSQL schema; Weeks 4-7 built real-time WebSocket vehicle state listeners; Weeks 8-10 integrated digital driver safety logs and performance telemetry.",
    architecture: {
      title: "Real-time Telemetry & WebSockets Architecture",
      description: "Combines Next.js SSR with Supabase PostgreSQL Realtime listeners for instantaneous vehicle coordinate and route dispatch sync.",
      diagramType: "Real-time Telemetry Pipeline",
      components: [
        { name: "Dispatcher Console", type: "Next.js & React", details: "Interactive map view with vehicle coordinate clustering and trip assignment controls." },
        { name: "Realtime Gateway", type: "Supabase WebSockets", details: "Instant push notifications when vehicle status or delivery targets change." },
        { name: "Database Store", type: "PostgreSQL", details: "Geospatial queries and historical trip log archives." }
      ]
    },
    databaseDesign: {
      engine: "PostgreSQL (PostGIS)",
      schemaOverview: "Relational GIS database schema managing vehicle fleets, active drivers, trip routes, and location telemetry logs.",
      tables: [
        { name: "vehicles", fields: "id, vin, status, current_lat, current_lng, last_ping", purpose: "Tracks active fleet inventory and real-time GPS locations." },
        { name: "trips", fields: "id, vehicle_id, driver_id, origin, destination, status", purpose: "Stores scheduled and in-progress transport dispatches." },
        { name: "compliance_logs", fields: "id, driver_id, checklist_data, timestamp", purpose: "Stores digital pre-trip safety audit records." }
      ]
    },
    decisions: [
      {
        decision: "Supabase Realtime Listeners",
        reason: "Eliminates custom socket server maintenance while streaming updates.",
        tradeoff: "Requires careful listener subscription cleanup.",
        result: "Zero-delay vehicle coordinate sync across dispatch consoles."
      }
    ],
    challenges: [
      {
        challenge: "Offline Network Drops on Highways",
        solution: "Implemented IndexedDB offline caching with automatic background sync upon re-connection."
      }
    ],
    results: "Cut fleet dispatch coordination overhead by 85% and reduced delivery delay rates by 18%.",
    metrics: [
      { metric: "< 5 min", label: "Dispatch Time", description: "Reduced average assignment time from 40 minutes." },
      { metric: "18%", label: "Delay Reduction", description: "Improved route delivery efficiency." },
      { metric: "100%", label: "Digital Audits", description: "Fully digitized driver safety compliance logs." }
    ],
    lessons: "Field applications operating in variable mobile network conditions must treat offline storage as a top-priority feature rather than an edge case.",
    futureImprovements: [
      "Predictive vehicle maintenance alerts powered by IoT sensor analytics.",
      "Automated route optimization taking live weather and traffic data into account."
    ]
  },
  "customer-sales-analysis": {
    id: "customer-sales-analytics",
    slug: "customer-sales-analysis",
    projectNum: "003",
    title: "Customer Sales Analytics",
    subtitle: "Business Intelligence & Revenue Dashboard",
    status: "Research",
    duration: "6 Weeks",
    startDate: "Nov 2024",
    completionDate: "Dec 2024",
    role: "Data Analyst & Pipeline Developer",
    platform: "Power BI Dashboard & Analytics Report",
    techStack: ["Python", "Pandas", "NumPy", "SQL", "PostgreSQL", "Power BI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://sales-analytics.vercel.app",
    githubUrl: "https://github.com/Prajvalinjar/customer-sales-analytics",
    docUrl: "/resume.pdf",

    overview: "Customer Sales Analytics is an end-to-end data engineering and business intelligence solution. It cleans raw multi-branch transaction datasets, runs Python RFM customer segmentations, and delivers dynamic Power BI visualizations.",
    problemStatement: "Multi-branch retail records resided in disjointed, uncleaned ERP files. Management lacked clear visualization into regional revenue trends, customer lifetime value, and inventory purchasing behaviors.",
    research: "Analyzed transaction records across 4 regional branches. Discovered duplicate entries, inconsistent date schemas, and unmapped currency conversions that compromised weekly reports.",
    planning: "Weeks 1-2 developed Python automated data cleaning scripts; Weeks 3-4 designed PostgreSQL data warehouse tables; Weeks 5-6 built interactive Power BI reporting dashboards.",
    architecture: {
      title: "Automated ETL & BI Analytics Pipeline",
      description: "Python ETL scripts pull raw transactional data, clean anomalies into a PostgreSQL data warehouse, and feed auto-refreshing Power BI dashboards.",
      diagramType: "Data Warehouse & BI Pipeline",
      components: [
        { name: "Python ETL Runner", type: "Pandas & NumPy", details: "Cleans raw transactional CSVs, deduplicates customer IDs, and formats date schemas." },
        { name: "Data Warehouse", type: "PostgreSQL", details: "Structured relational data warehouse serving as single source of analytical truth." },
        { name: "BI Visualization", type: "Power BI", details: "Interactive executive reporting dashboards with DAX measures and trend slicers." }
      ]
    },
    databaseDesign: {
      engine: "PostgreSQL Warehouse",
      schemaOverview: "Star schema data warehouse design with central sales fact table linked to dimension tables for customers, products, and branches.",
      tables: [
        { name: "fact_sales", fields: "transaction_id, customer_id, product_id, branch_id, amount, date", purpose: "Central transaction records for revenue calculations." },
        { name: "dim_customers", fields: "customer_id, segment, rfm_score, total_spend", purpose: "Stores RFM customer segmentation analytics." },
        { name: "dim_products", fields: "product_id, category, unit_price, margin", purpose: "Stores product catalog metadata and profit margins." }
      ]
    },
    decisions: [
      {
        decision: "Python Data Pre-processing",
        reason: "Executing data transformations in Python is significantly faster than DAX queries in Power BI.",
        tradeoff: "Requires maintaining pre-processing script pipelines.",
        result: "Dashboard renders instantly with 0 reporting latency."
      }
    ],
    challenges: [
      {
        challenge: "Inconsistent Customer Identifier Formats",
        solution: "Built a Python fuzzy-matching deduplication script that unified customer records."
      }
    ],
    results: "Saved the reporting team 24+ manual weekly hours while increasing revenue forecasting accuracy to 91%.",
    metrics: [
      { metric: "24 hrs", label: "Weekly Saved", description: "Eliminated manual spreadsheet aggregation." },
      { metric: "91%", label: "Forecast Accuracy", description: "Delivered accurate monthly revenue projections." },
      { metric: "12%", label: "Revenue Growth", description: "Captured via targeted regional inventory replenishment." }
    ],
    lessons: "Data cleaning performed upstream in the data warehouse tier is far more maintainable than complex DAX calculations in dashboard layers.",
    futureImprovements: [
      "Automated anomaly detection alerts notifying managers of sudden drop-offs in category sales.",
      "Real-time streaming pipeline integration with Apache Kafka."
    ]
  },
  "e-tongue": {
    id: "e-tongue",
    slug: "e-tongue",
    projectNum: "004",
    title: "E-Tongue Dravya System",
    subtitle: "AI-assisted Ayurvedic Sensor Classification",
    status: "Prototype",
    duration: "12 Weeks",
    startDate: "Aug 2024",
    completionDate: "Nov 2024",
    role: "Hardware & ML Research Engineer",
    platform: "IoT Prototype / Python Interface",
    techStack: ["Python", "OpenCV", "Machine Learning", "IoT", "Embedded System", "MySQL"],
    image: "/images/project_etongue.jpg",
    screenshots: [
      "/images/project_etongue.jpg"
    ],
    liveUrl: "https://e-tongue.vercel.app",
    githubUrl: "https://github.com/Prajvalinjar/e-tongue",
    docUrl: "/resume.pdf",

    overview: "E-Tongue is an innovative hardware-software IoT research prototype that automates the objective classification of Ayurvedic liquid samples (Dravya) using multi-sensor signal fusion and Scikit-learn machine learning.",
    problemStatement: "Traditional Ayurvedic Dravya identification relies on subjective human sensory assessment. This lack of objective scientific measurement hinders standardized quality control in botanical pharmaceutical manufacturing.",
    research: "Analyzed chemical readings from 50+ Dravya liquid samples. Proved that combining pH, electrical conductivity, TDS, and temperature measurements establishes a unique 'digital fingerprint' for each liquid sample.",
    planning: "Weeks 1-4 built analog hardware sensor circuits connected to an ESP32 micro-controller; Weeks 5-8 calibrated sensor voltage curves and signal filtering; Weeks 9-12 trained Scikit-learn ML models.",
    architecture: {
      title: "IoT Sensor Fusion & Edge Machine Learning",
      description: "ESP32 micro-controller captures analog sensor array signals, filters electrical noise, and streams calibrated vectors to a Python machine learning classifier.",
      diagramType: "IoT Hardware & ML Pipeline",
      components: [
        { name: "Sensor Probe Array", type: "pH, TDS, Temp Sensors", details: "Measures chemical properties of liquid botanical samples." },
        { name: "Microcontroller", type: "ESP32 Microcontroller", details: "ADC sampling, signal smoothing, and serial telemetry transmission." },
        { name: "ML Classifier", type: "Scikit-Learn Python", details: "Random Forest & SVM classification model identifying sample categories." }
      ]
    },
    databaseDesign: {
      engine: "MySQL Database",
      schemaOverview: "Database schema storing raw sensor voltage logs, sample calibration baselines, and ML prediction history.",
      tables: [
        { name: "sample_logs", fields: "id, sample_name, ph_val, tds_val, temp_val, timestamp", purpose: "Logs raw analog sensor telemetry per test run." },
        { name: "calibrations", fields: "id, sensor_type, baseline_voltage, calibrated_at", purpose: "Stores distilled water calibration benchmark values." },
        { name: "predictions", fields: "id, sample_log_id, predicted_class, confidence_score", purpose: "Stores output classification model results." }
      ]
    },
    decisions: [
      {
        decision: "Random Forest Classifier",
        reason: "High stability and accuracy when classifying small, multi-dimensional sensor feature sets.",
        tradeoff: "Slightly larger model payload than linear classifiers.",
        result: "Achieved 88% Dravya classification accuracy."
      }
    ],
    challenges: [
      {
        challenge: "Analog Sensor Signal Drift & Noise",
        solution: "Implemented hardware grounding shields and a digital low-pass moving-average filter in firmware."
      }
    ],
    results: "Validated a hardware prototype achieving 88% accuracy in Dravya classification and objective liquid property analysis.",
    metrics: [
      { metric: "88%", label: "Accuracy", description: "Sample identification precision." },
      { metric: "3", label: "Sensor Channels", description: "Simultaneous pH, TDS, and thermal data acquisition." },
      { metric: "< 3s", label: "Response Time", description: "Instant classification output." }
    ],
    lessons: "Hardware signal noise must be attenuated at the physical sensor level; post-processing digital algorithms cannot completely recover corrupted signal data.",
    futureImprovements: [
      "Integrating optical spectrophotometer sensors for multi-spectral liquid analysis.",
      "Building a custom mobile app for field lab researchers."
    ]
  }
};
