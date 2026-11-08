export const getProjectSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export interface ArchitectureStep {
  step: string;
  label: string;
  desc?: string;
  type?: 'input' | 'process' | 'ai' | 'verify' | 'output';
}

export interface MetricItem {
  metric: string;
  value: string;
  note?: string;
}

export interface ChallengeDetail {
  problem: string;
  solution: string;
}

export interface Project {
  slug?: string;
  title: string;
  subtitle?: string;
  category?: string;
  description: string;
  techStack: string[];
  features?: {
    live: string[];
    inProgress?: string[];
    planned?: string[];
  };
  listFeatures?: string[];
  challenges?: (string | ChallengeDetail)[];
  badge?: "Featured" | "Live" | "In Progress" | "Academic" | "Concept";
  githubUrl?: string;
  demoUrl?: string;
  role?: string;
  isFlagship?: boolean;

  // Case Study Sections
  overview?: string;
  problemStatement?: string;
  solutionStatement?: string;
  datasetInfo?: string;
  hardwareSpecs?: string;
  workflow?: ArchitectureStep[];
  engineeringHighlights?: string[];
  resultsAndEvaluation?: MetricItem[];
  evaluationNotes?: string[];
  limitationsAndFuture?: string[];
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
  year?: string;
  pdfPath: string;
}

export interface ResumeProjectSummary {
  title: string;
  category: string;
  bullets: string[];
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
  resumeProjects: ResumeProjectSummary[];
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
  status: "BCA Student / Software & AI Developer",
  positioning: "A developer focused on building full-stack applications, applied AI systems, machine learning pipelines, and intelligent automations.",
  careerObjective: "I build full-stack web apps, machine learning pipelines, and AI prompt engineering systems focused on solving real-world challenges. Currently open to freelance, full-time, and fresher roles where I can build and contribute directly.",
  interests: [
    "AI Prompt Engineering Systems",
    "Applied Machine Learning & Regression",
    "Natural Language Processing",
    "Full-Stack Web Development",
    "Local LLM Inference (Ollama)",
    "Workflow & Pipeline Automation",
    "Data Analytics & Feature Engineering"
  ],
  githubUsername: "Rohith1833",
  githubUrl: "https://github.com/Rohith1833",
  linkedinUrl: "https://www.linkedin.com/in/rohith-gowda-s-449939339/",
  resumePath: "",
  contactEmail: "rohithmohith78@gmail.com",
  instagramUrl: "https://www.instagram.com/rohith_s_08/",
  contactPhone: "+91 8147432095",
  learningNote: "Continuing to learn production MLOps, scalable backend architecture, cloud infrastructure, and low-latency model serving.",
  currentlyBuilding: "HumanIntent v2 & applied machine learning intelligence tools.",
  skills: [
    {
      category: "Programming",
      items: ["Python", "JavaScript", "TypeScript"]
    },
    {
      category: "AI / Machine Learning",
      items: [
        "Machine Learning",
        "Scikit-learn",
        "Regression",
        "NLP",
        "Sentiment Analysis",
        "LLM Integration",
        "Prompt Engineering",
        "Local LLM Inference",
        "Model Evaluation"
      ]
    },
    {
      category: "Frameworks",
      items: ["React", "Next.js", "FastAPI", "Streamlit"]
    },
    {
      category: "Data & Tools",
      items: ["Pandas", "NumPy", "SQLite", "Git", "GitHub", "Ollama", "Joblib"]
    }
  ],
  resumeProjects: [
    {
      title: "HumanIntent",
      category: "AI Engineering / NLP / LLM Systems",
      bullets: [
        "Developed a local-first AI prompt optimization system using FastAPI, Next.js, and Ollama, combining semantic decomposition and deterministic verification to preserve user requirements.",
        "Built a structured dataset-generation and evaluation pipeline, achieving 442/442 automated tests and 10/10 blind evaluation probes in the reported v1.0 acceptance run.",
        "Integrated local Llama 3 inference to generate optimized prompts without requiring paid cloud LLM APIs."
      ]
    },
    {
      title: "Food Delivery Time Predictor",
      category: "Machine Learning / Regression",
      bullets: [
        "Developed an end-to-end machine learning application to predict food delivery time using approximately 45,000 delivery records.",
        "Engineered geographic distance features using the Haversine formula and implemented consistent preprocessing with Scikit-learn Pipelines.",
        "Compared Linear Regression, Random Forest, and Gradient Boosting models and integrated the selected model into an interactive Streamlit application."
      ]
    },
    {
      title: "LocalLens",
      category: "Artificial Intelligence / NLP / Data Analytics",
      bullets: [
        "Built an NLP-based restaurant review analyzer using Python, Streamlit, and VADER sentiment analysis.",
        "Implemented aspect-based opinion extraction across food, service, price, cleanliness, and waiting time using clause splitting and rule-based processing.",
        "Developed an interactive dataset dashboard with CSV upload, visual analytics, chunk-based processing, and export functionality."
      ]
    }
  ],
  featuredProjects: [
    {
      title: "HumanIntent",
      subtitle: "An Intent-Preserving Adaptive Prompt Optimization System.",
      category: "AI Engineering / NLP / LLM Systems",
      badge: "Featured",
      isFlagship: true,
      description: "HumanIntent is an AI-powered prompt optimization system that transforms unclear, incomplete, and unstructured user requests into structured prompts while preserving their original intent. Unlike basic prompt enhancers, it combines deterministic preprocessing, semantic decomposition, constraint extraction, ambiguity detection, local LLM generation, and deterministic verification.",
      techStack: [
        "Next.js", "React", "TypeScript",
        "Python", "FastAPI", "Pydantic",
        "Ollama", "Llama 3", "SQLite", "Tailwind CSS"
      ],
      role: "System Architecture, Local LLM Pipeline, Deterministic Verification & Full-Stack Implementation",
      overview: "HumanIntent addresses a persistent challenge in generic prompt rewriters: the tendency to erase critical domain constraints, hallucinate ungrounded instructions, or bloat user requirements with generic adjectives. Running fully local with zero external API costs or data egress, HumanIntent couples programmatic deterministic rules with local Llama 3 inference to deliver intent-grounded, production-ready prompts.",
      problemStatement: "Most commercial prompt enhancers act as black boxes. They append generic boilerplate, strip negative constraints, alter technical parameters, and leak proprietary queries to third-party cloud APIs. Furthermore, experimental multi-stage prompt generation chains suffer from compounding hallucinations and prohibitive latency, making them impractical for fast local developer workflows.",
      solutionStatement: "HumanIntent employs an accepted v1.0 fast-path architecture: deterministic preprocessing cleans and decomposes input into intent, constraints, and variables; a single, tightly constrained local LLM call generates the structured prompt; and deterministic post-verification programmatically checks that all original user boundary conditions are preserved.",
      features: {
        live: [
          "Intent Understanding: Accurately identifies user goals, audience context, and expected deliverable modality",
          "Semantic Decomposition: Isolates constraints, variable slots, formatting guidelines, and core logic",
          "Constraint Preservation: Enforces zero-drop retention of user negative limits and technical schemas",
          "Ambiguity Detection: Identifies missing variables, underspecified scopes, and ambiguous target outputs",
          "Adaptive Prompt Generation: Dynamically selects prompt templates tailored to coding, system design, or creative tasks",
          "Multi-Mode Optimization: Supports Quick, Professional, and Deep prompt enhancement modes",
          "Deterministic Verification: Rule-based engine parses generated output against extracted constraint manifests",
          "Long-Input Handling & Semantic Chunking: Smoothly digests multi-paragraph briefs and unstructured specs",
          "Local LLM Integration: Uses Ollama and quantized Llama 3 for complete offline privacy with zero API bills",
          "Session & Test Logging: Local SQLite persistence for latency tracking, regression tests, and audit trails"
        ]
      },
      workflow: [
        { step: "01", label: "User Input", desc: "Raw, unstructured or ambiguous user prompt submission", type: "input" },
        { step: "02", label: "Deterministic Preprocessing", desc: "Sanitization, syntax normalization, and parameter extraction (<5ms)", type: "process" },
        { step: "03", label: "Intent & Constraint Extraction", desc: "Semantic decomposition of goals, rules, and negative constraints", type: "process" },
        { step: "04", label: "Ambiguity Detection", desc: "Flags missing parameters, undefined variables, and scope gaps", type: "process" },
        { step: "05", label: "Local LLM Generation", desc: "Single-call inference via Ollama (Llama 3 8B) on consumer GPU", type: "ai" },
        { step: "06", label: "Deterministic Verification", desc: "Programmatic audit confirming zero constraint drops or hallucinations", type: "verify" },
        { step: "07", label: "Optimized Prompt", desc: "Structured, validated prompt with markdown schemas and tags", type: "output" }
      ],
      engineeringHighlights: [
        "Deterministic Preprocessing: Fast, rule-based text normalizer and parameter extractor implemented in pure Python to eliminate pipeline overhead.",
        "Accepted v1.0 Fast-Path: Consolidated into a single structured LLM generation call, avoiding compounding error cascades found in multi-stage pipelines.",
        "Deterministic Post-Generation Verification: Programmatic audit checks output against extracted user constraints and tags dropped requirements with warning badges.",
        "Dataset Generation Infrastructure: Automated prompt-response synthesis tool built to generate diverse test probes across coding, writing, and analysis tasks.",
        "Evaluation & Benchmarking: Comprehensive test suite verifying latency, constraint recall, and intent fidelity across diverse prompt lengths.",
        "Strict Requirement Preservation: Preserves user-specified technology versions, file names, API signatures, and negative conditions without alteration."
      ],
      challenges: [
        {
          problem: "Balancing prompt enrichment depth with local inference latency on consumer GPU hardware.",
          solution: "Streamlined the accepted v1.0 architecture into a single-call structured generation path, offloading decomposition, validation, and chunking to sub-millisecond Python deterministic routines."
        },
        {
          problem: "Preventing local LLMs from hallucinating auxiliary constraints or dropping subtle user boundaries.",
          solution: "Constructed a deterministic post-generation validation parser that inspects the generated output against the pre-extracted constraint manifest, flagging any discrepancies."
        },
        {
          problem: "Handling lengthy technical requests without exceeding context budgets or introducing drift.",
          solution: "Implemented semantic chunking to separate contextual reference material from operational instructions, feeding structured prompt segments cleanly to Ollama."
        }
      ],
      resultsAndEvaluation: [
        { metric: "Automated Test Suite", value: "442 / 442", note: "100% automated tests passed across unit, integration, and regression suites" },
        { metric: "Blind Evaluation Probes", value: "10 / 10", note: "100% passed on diverse multi-domain blind evaluation benchmark" },
        { metric: "P50 Latency", value: "15.62s", note: "Median latency on NVIDIA RTX 3050 Laptop GPU running local Llama 3" },
        { metric: "P95 Latency", value: "25.50s", note: "95th percentile latency on long multi-paragraph inputs in Deep mode" },
        { metric: "Frontend Build", value: "Completed", note: "Full production build verified in Next.js & TypeScript" },
        { metric: "Inference Engine", value: "Local Ollama", note: "Zero external API requests; 100% local hardware execution" }
      ],
      hardwareSpecs: "NVIDIA RTX 3050 Laptop GPU (4GB VRAM), Local Ollama inference with Llama 3 8B (4-bit quantized)",
      evaluationNotes: [
        "Reported metrics are based on local benchmarking runs on an NVIDIA RTX 3050 Laptop GPU using Ollama and Llama 3.",
        "Architecture Clarity: The accepted v1.0 architecture employs a fast-path single LLM call paired with deterministic verification; experimental multi-stage pipeline variants were exploratory research iterations.",
        "Accuracy Boundary: HumanIntent is an applied prompt optimization system utilizing local open-weight LLMs with deterministic verification; it is not a fine-tuned proprietary LLM, does not claim zero hallucinations, and is not a commercial SaaS deployment.",
        "Dataset infrastructure developed for benchmarking is for evaluation purposes and does not represent a completed proprietary fine-tuned checkpoint."
      ],
      limitationsAndFuture: [
        "Inference latency is governed by local 4GB laptop GPU memory bandwidth; enterprise GPUs or quantization improvements can yield sub-5s responses.",
        "Ambiguity suggestions are currently presented inline to the developer rather than resolved via interactive multi-turn dialogue.",
        "Future roadmap includes fine-tuning a small specialized 3B parameter model on the synthesized prompt optimization dataset."
      ]
    },
    {
      title: "Food Delivery Time Predictor",
      subtitle: "Machine Learning-Based Food Delivery ETA Prediction.",
      category: "Machine Learning / Regression",
      badge: "Live",
      isFlagship: false,
      demoUrl: "https://timepredictor.streamlit.app/",
      description: "A machine learning web application that predicts food delivery time using delivery distance, rider details, traffic conditions, weather, order type, and vehicle information.",
      techStack: [
        "Python", "Pandas", "NumPy",
        "Scikit-learn", "Matplotlib", "Seaborn",
        "Joblib", "Streamlit", "Git/GitHub"
      ],
      role: "End-to-End ML Pipeline, Feature Engineering & Streamlit Application Development",
      datasetInfo: "Kaggle Food Delivery Dataset by Gaurav Malik, approximately 45,000 delivery records.",
      overview: "An end-to-end applied machine learning project addressing ETA estimation for on-demand logistics. The application encompasses raw data cleaning, geographic feature engineering with the Haversine formula, reproducible Scikit-learn Pipeline construction, algorithmic regression comparison (Linear Regression, Random Forest, and Gradient Boosting), and an interactive Streamlit web dashboard for real-time inference.",
      problemStatement: "Food delivery platforms require dependable ETA estimates to coordinate rider allocation and manage customer expectations. Historical delivery records frequently contain noisy string formats, coordinate errors, and diverse categorical variables (weather, traffic density, vehicle type, order type). Inconsistent preprocessing between experimental notebooks and serving code leads to training-serving skew, degrading predictions in live use.",
      solutionStatement: "Engineered a unified Scikit-learn Pipeline utilizing ColumnTransformer to bundle geographic Haversine distance calculations, numeric scaling, and one-hot categorical encoding. Serialized the end-to-end pipeline into a reusable Joblib artifact and deployed an interactive Streamlit interface that guarantees 100% preprocessing consistency on new user inputs.",
      features: {
        live: [
          "Data Cleaning & Imputation: Strips text prefixes from target times, filters invalid coordinates, and handles nulls",
          "Haversine Distance Engineering: Converts latitude and longitude into precise spherical distance in kilometers",
          "Unified Scikit-learn Pipeline: Bundles ColumnTransformer with regressors to eliminate training-serving skew",
          "Categorical Encoding: Applies OneHotEncoder to weather, traffic levels, and vehicle categories",
          "Multi-Model Regression Comparison: Benchmarks Linear Regression, Random Forest, and Gradient Boosting",
          "Model Evaluation Metrics: Comprehensive evaluation across Mean Absolute Error (MAE), RMSE, and R²",
          "Feature Importance Visualization: Identifies top predictive signals driving delivery duration",
          "Actual vs. Predicted Diagnostics: Scatter plot and residual visualizations assessing model fit",
          "Interactive Streamlit Interface: Real-time slider and dropdown controls for instant delivery time estimation",
          "Pipeline Artifact Serialization: Joblib persistence allowing zero-overhead model loading"
        ]
      },
      workflow: [
        { step: "01", label: "Kaggle Dataset", desc: "45,000 raw delivery records (Gaurav Malik)", type: "input" },
        { step: "02", label: "Data Cleaning", desc: "Target parsing, regex cleaning, and missing value handling", type: "process" },
        { step: "03", label: "Feature Engineering", desc: "Haversine spherical distance calculation from coordinates", type: "process" },
        { step: "04", label: "Preprocessing Pipeline", desc: "ColumnTransformer with OneHotEncoder & StandardScaler", type: "process" },
        { step: "05", label: "Model Training & Tuning", desc: "Linear Regression, Random Forest, and Gradient Boosting", type: "ai" },
        { step: "06", label: "Evaluation & Benchmarking", desc: "MAE, RMSE, and R² comparison across algorithms", type: "verify" },
        { step: "07", label: "Streamlit Web Interface", desc: "Interactive GUI with serialized Joblib pipeline inference", type: "output" }
      ],
      engineeringHighlights: [
        "Messy Target Extraction: Successfully extracted numeric minutes from inconsistent string targets (e.g. '(min) 24') across the ~45,000 delivery dataset.",
        "Haversine Distance Calculation: Converted geographic coordinate pairs (restaurant lat/long to customer lat/long) into true physical delivery distance, creating a high-correlation feature.",
        "Unified Pipeline Architecture: Enforced strict use of Scikit-learn Pipeline and ColumnTransformer to eliminate data leakage and ensure train-test feature parity.",
        "Algorithmic Comparison: Systematically compared Linear Regression (interpretable baseline), Random Forest (non-linear relationships), and Gradient Boosting.",
        "Streamlit Application: Designed a clean web app allowing users to adjust rider age, rating, delivery distance, weather, and traffic conditions to predict delivery ETA."
      ],
      challenges: [
        {
          problem: "Messy target delivery time values formatted as inconsistent string annotations.",
          solution: "Built a robust regular expression extraction function to parse integers from string wrappers and validated distribution bounds before model ingestion."
        },
        {
          problem: "Training-serving skew when deploying model logic to the interactive Streamlit user interface.",
          solution: "Bundled all feature scalers, coordinate transformers, and one-hot encoders into a unified Scikit-learn Pipeline and exported it via Joblib, guaranteeing identical transformations."
        },
        {
          problem: "Capturing spatial relationships without introducing geospatial coordinate leakage.",
          solution: "Transformed raw coordinate attributes into spherical Haversine distance, summarizing location pairs into a continuous physical metric."
        }
      ],
      resultsAndEvaluation: [
        { metric: "Dataset Volume", value: "~45,000 Records", note: "Kaggle Food Delivery dataset by Gaurav Malik" },
        { metric: "Models Evaluated", value: "3 Algorithms", note: "Linear Regression, Random Forest, Gradient Boosting" },
        { metric: "Core Distance Metric", value: "Haversine Formula", note: "Spherical distance calculation in kilometers" },
        { metric: "Pipeline Integrity", value: "100% Zero-Skew", note: "Scikit-learn ColumnTransformer bundled with regressor" },
        { metric: "Serving Technology", value: "Streamlit + Joblib", note: "Local interactive inference dashboard" }
      ],
      evaluationNotes: [
        "Evaluation strictly reflects applied machine learning benchmarking on the Gaurav Malik Kaggle dataset.",
        "Accuracy Boundary: Does not invent MAE, RMSE, or R² values; models were trained and compared under standard Scikit-learn evaluation metrics.",
        "Deployment: Live interactive prediction application deployed at https://timepredictor.streamlit.app/."
      ],
      limitationsAndFuture: [
        "Traffic conditions currently rely on categorical tiers ('Low', 'Medium', 'High', 'Jam') rather than dynamic live GPS telemetry APIs.",
        "Extreme anomalous weather events represent a minor fraction of training observations.",
        "Future iterations will explore packaging the model as a Dockerized FastAPI microservice with automated drift detection."
      ]
    },
    {
      title: "LocalLens",
      subtitle: "Restaurant Review Sentiment & Aspect-Based Opinion Analyzer.",
      category: "Artificial Intelligence / NLP / Data Analytics",
      badge: "Live",
      isFlagship: false,
      demoUrl: "https://reviewintelligence.netlify.app/",
      description: "LocalLens is an NLP-powered restaurant review intelligence application that analyzes customer feedback and identifies sentiment across five restaurant-related aspects. Unlike basic sentiment classification, LocalLens attempts to identify which specific aspects of a restaurant customers appreciate or criticize.",
      techStack: [
        "Python", "Streamlit", "Pandas",
        "SQLite", "VADER Sentiment", "Altair",
        "Regular Expressions", "Text Normalization", "Lexicon Analysis"
      ],
      role: "NLP Algorithm Design, Aspect Extraction Engine & Streamlit Dashboard Architecture",
      datasetInfo: "UCI Sentiment Labelled Sentences (Yelp subset, 1,000 reviews: 500 positive, 500 negative) + 30 synthetic multi-aspect demonstration reviews.",
      overview: "LocalLens bridges the gap between overall customer sentiment and actionable operational intelligence. While standard sentiment classifiers summarize an entire paragraph with a single positive or negative label, LocalLens decomposes reviews into five key hospitality pillars: Food, Service, Price, Cleanliness, and Wait Time. This enables restaurateurs to pinpoint exactly what patrons love or want fixed.",
      problemStatement: "Customer reviews are inherently multi-faceted: 'The pizza was phenomenal, but the waiter was rude and we waited forty minutes for our bill.' Conventional binary classifiers score this review with an ambiguous neutral or negative flag, completely obscuring the kitchen's culinary success while masking operational pacing issues. Restaurants need granular aspect-level feedback to take targeted action.",
      solutionStatement: "Developed an aspect-oriented sentiment analyzer combining clause splitting on contrastive conjunctions ('but', 'however', 'although'), keyword-based aspect mapping across 5 hospitality categories, and sentiment scoring using VADER augmented with a restaurant-domain lexicon. Wrapped in a responsive Streamlit application featuring single-review inspection, bulk CSV processing, and Altair data visualizations.",
      features: {
        live: [
          "Aspect-Based Opinion Extraction: Categorizes feedback across Food, Service, Price, Cleanliness, and Wait Time",
          "Clause Splitting Engine: Isolates contrasting sub-clauses joined by conjunctions to evaluate distinct opinions",
          "Mixed-Sentiment Analysis: Detects contradictory positive and negative statements within a single review",
          "Interactive Review Explorer: Real-time sentence tester highlighting extracted clauses and aspect badges",
          "Dataset Dashboard: Interactive Altair visual analytics exploring aspect distributions and rating volumes",
          "Batch CSV Ingestion: Chunk-based data processor designed to handle large review files without freezing UI",
          "Temporary SQLite Storage: Local relational caching layer for efficient query filtering and sorting",
          "CSV Report Export: One-click export of analyzed aspect-sentiment datasets for external reporting",
          "Restaurant Lexicon Integration: Domain-tailored vocabulary tuning for culinary and hospitality terms"
        ]
      },
      workflow: [
        { step: "01", label: "Review Input", desc: "Single sentence entry or bulk CSV review upload", type: "input" },
        { step: "02", label: "Text Preprocessing", desc: "Normalization, punctuation handling, and case folding", type: "process" },
        { step: "03", label: "Clause Splitting", desc: "Regex decomposition across coordinating conjunctions", type: "process" },
        { step: "04", label: "Aspect Detection", desc: "Keyword matching across Food, Service, Price, Cleanliness, Wait Time", type: "process" },
        { step: "05", label: "VADER Sentiment Scoring", desc: "Lexicon-augmented intensity analysis per extracted clause", type: "ai" },
        { step: "06", label: "Aspect-Level Aggregation", desc: "Composite scoring combining clause polarities into aspect metrics", type: "verify" },
        { step: "07", label: "Streamlit Dashboard", desc: "Interactive Review Explorer and Altair visual charts", type: "output" }
      ],
      engineeringHighlights: [
        "Clause-Level Decomposition: Overcame single-polarity limitations by splitting compound sentences on coordinating conjunctions, allowing opposing opinions to be evaluated separately.",
        "Five-Aspect Taxonomy: Formulated distinct keyword clusters for Food, Service, Price, Cleanliness, and Wait Time.",
        "Domain-Augmented Lexicon: Enhanced VADER sentiment intensity scoring with hospitality-specific terminology to capture nuances like 'soggy', 'piping hot', 'overpriced', and 'attentive'.",
        "Chunk-Based CSV Pipeline: Implemented generator-driven file chunking with SQLite indexing to keep the Streamlit interface responsive during bulk dataset ingestion.",
        "Benchmark Evaluation: Rigorously benchmarked overall binary sentiment classification on the standard UCI Yelp dataset."
      ],
      challenges: [
        {
          problem: "Mixed sentiment inside a single customer review masking operational critiques.",
          solution: "Implemented regex-driven clause boundary detection on contrastive conjunctions ('but', 'yet', 'although'), scoring each clause independently before mapping to detected aspects."
        },
        {
          problem: "Polysemous adjectives where context dictates aspect meaning (e.g., 'cold' describing food versus customer service).",
          solution: "Employed token proximity matching to associate descriptive adjectives with the nearest preceding or following aspect keyword."
        },
        {
          problem: "Preventing UI freezes when processing multi-megabyte review CSVs in Streamlit.",
          solution: "Structured batch processing into generator chunks staged temporarily in SQLite, allowing incremental UI progress bars and responsive pagination."
        }
      ],
      resultsAndEvaluation: [
        { metric: "Overall Accuracy", value: "74.5%", note: "Evaluated on UCI Yelp review benchmark (1,000 sentences)" },
        { metric: "Positive Recall", value: "96.8%", note: "High sensitivity in identifying positive customer feedback" },
        { metric: "Precision", value: "66.94%", note: "Binary sentiment classification precision on test subset" },
        { metric: "F1 Score", value: "79.15%", note: "Harmonic mean across 500 positive and 500 negative benchmark samples" },
        { metric: "Aspects Covered", value: "5 Dimensions", note: "Food, Service, Price, Cleanliness, Wait Time" },
        { metric: "Sample Review Set", value: "1,000 + 30 Reviews", note: "UCI Yelp benchmark + 30 synthetic demonstration examples" }
      ],
      evaluationNotes: [
        "Important Metric Clarification: Reported evaluation scores (74.5% Accuracy, 96.8% Recall, 66.94% Precision, 79.15% F1) represent overall sentence-level sentiment classification on the 1,000 UCI Yelp review benchmark, NOT aspect-level extraction accuracy.",
        "Demonstration Dataset Notice: The 30 multi-aspect reviews are synthetic demonstration examples specifically created to showcase clause-splitting on complex mixed sentences; they are not real customer data.",
        "Model Type Boundary: LocalLens employs rule-based NLP, text normalization, and VADER sentiment intensity analysis; it is not a fine-tuned deep learning transformer and does not claim to solve subtle sarcasm or implicit unstated opinions.",
        "Deployment: Live review intelligence web application deployed at https://reviewintelligence.netlify.app/."
      ],
      limitationsAndFuture: [
        "Aspect assignment is keyword-lexicon driven; unconventional slang or poetic metaphors may be categorized as General sentiment.",
        "Sarcasm remains an inherent limitation for rule-based lexicon systems.",
        "Future architecture updates aim to introduce local lightweight Sentence-Transformers for semantic embedding clustering."
      ]
    },
    {
      title: "Health Tracker PWA",
      subtitle: "Production-oriented Progressive Web App for home-workout tracking.",
      category: "Full-Stack Development / PWA",
      badge: "Live",
      isFlagship: false,
      githubUrl: "https://github.com/Rohith1833/health-tracker",
      description: "Full-stack health & fitness tracking Progressive Web App, built with a production-oriented approach rather than a simple CRUD project. Focused entirely on convenient home-workouts.",
      techStack: [
        "React", "TypeScript", "Vite", "Tailwind CSS", "React Router",
        "React Hook Form", "Zod", "Recharts", "Node.js", "Express",
        "PostgreSQL", "Prisma ORM", "Supabase Auth"
      ],
      role: "Full stack development and implementation, AI-assisted where useful, with thorough testing of codebase.",
      overview: "Tracking personal home-workouts effectively without having to rely on heavy, gym-centric mobile apps can be a challenge. Built to provide a focused workout logging system optimized for offline-ready home exercises and routines.",
      problemStatement: "Most commercial fitness applications are cluttered, require constant internet synchronization, and emphasize commercial gym machinery over bodyweight and home exercise setups.",
      solutionStatement: "Engineered a fast, offline-capable Progressive Web App with Supabase Authentication, PostgreSQL database persistence managed via Prisma ORM, and responsive visualization of workout trends using Recharts.",
      features: {
        live: [
          "Supabase Auth & Google login",
          "Protected frontend & backend routes",
          "Home workouts exercise library (search, categories, difficulty, favorites)",
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
      },
      workflow: [
        { step: "01", label: "User Client (PWA)", desc: "React + Vite Progressive Web App interface", type: "input" },
        { step: "02", label: "Service Worker Cache", desc: "Offline asset caching & session preservation", type: "process" },
        { step: "03", label: "Supabase Auth", desc: "JWT OAuth login with protected route guards", type: "verify" },
        { step: "04", label: "Express Backend API", desc: "Type-safe REST API endpoints with Zod validation", type: "process" },
        { step: "05", label: "Prisma ORM & PostgreSQL", desc: "Structured relational persistence for workouts and logs", type: "output" }
      ],
      challenges: [
        {
          problem: "Maintaining offline state and Supabase Auth token refreshing in PWA standalone mode.",
          solution: "Coordinated service worker caching rules with React Router authentication context to maintain seamless session states."
        }
      ],
      resultsAndEvaluation: [
        { metric: "Architecture", value: "PWA + REST", note: "Mobile-first installable web application" },
        { metric: "ORM Layer", value: "Prisma + Postgres", note: "Type-safe database migrations and relations" },
        { metric: "Auth Security", value: "Supabase Auth", note: "JWT validation on protected routes" }
      ]
    },
    {
      title: "IntelliSlide AI",
      subtitle: "AI-powered presentation generator converting textbooks into slide decks.",
      category: "AI & Automation / Python",
      badge: "In Progress",
      isFlagship: false,
      description: "AI-powered presentation builder that converts textbook/PDF content into structured educational presentation slides. Tailored for students to quickly synthesize study material.",
      techStack: [
        "React", "Vite", "Tailwind CSS", "Framer Motion",
        "Flask", "Python", "PyMuPDF", "python-pptx", "Groq API (Llama models)"
      ],
      role: "End-to-end design, API integration, presentation generation scripting, and PDF parsing implementation.",
      overview: "Students and educators spend hours converting lengthy textbook chapters into classroom presentation decks. IntelliSlide AI extracts PDF content, organizes key units, synthesizes concepts via LLM prompts, and outputs downloadable PowerPoint PPTX files.",
      problemStatement: "Raw textbook PDFs contain chaotic formatting, headers, footers, and complex chapter hierarchies that defeat simple copy-paste slide creation.",
      solutionStatement: "Constructed an automated parsing and synthesis pipeline in Python combining PyMuPDF for structural text extraction with LLM slide structuring and python-pptx generation.",
      listFeatures: [
        "PDF upload & layout text extraction",
        "Unit/textbook-based content processing & outline detection",
        "AI-generated slide structure with customized slide counts",
        "Automated PPTX slide deck generation and download",
        "OCR fallback support for scanned/printed textbook content"
      ],
      workflow: [
        { step: "01", label: "PDF Document Upload", desc: "Textbook or lecture syllabus ingestion", type: "input" },
        { step: "02", label: "PyMuPDF Extraction", desc: "Layout-aware text and heading extraction", type: "process" },
        { step: "03", label: "Chapter Chunking", desc: "Splitting sections to respect LLM token boundaries", type: "process" },
        { step: "04", label: "LLM Slide Synthesizer", desc: "Structured outline and bullet generation", type: "ai" },
        { step: "05", label: "python-pptx Engine", desc: "Automated PowerPoint deck construction and styling", type: "process" },
        { step: "06", label: "PPTX Download", desc: "Ready-to-present educational slide deck", type: "output" }
      ],
      challenges: [
        "PDF layout text extraction (removing headers, footers, and retaining semantic order)",
        "Chapter/unit boundary detection in large textbook PDFs",
        "OCR fallback implementation on low-resolution scanned pages",
        "Managing LLM API token rate limits and chunking large text units",
        "Structuring and exporting hierarchical presentation decks via python-pptx"
      ],
      resultsAndEvaluation: [
        { metric: "Target Deliverable", value: "Formatted PPTX", note: "Downloadable PowerPoint slide decks" },
        { metric: "PDF Parser", value: "PyMuPDF", note: "Layout-aware structural text parsing" },
        { metric: "Slide Engine", value: "python-pptx", note: "Hierarchical slide generation" }
      ]
    }
  ],
  academicProjects: [
    {
      title: "Bus Reservation System",
      subtitle: "Relational Database Management System for Transit Scheduling.",
      category: "Database Systems / SQL",
      badge: "Academic",
      description: "Database management system designed to coordinate bus scheduling, passenger tickets booking, route networks, and operations management.",
      techStack: ["MySQL", "MySQL Workbench", "SQL", "Relational Modeling"],
      role: "Database Architecture, ER Modeling & SQL Query Optimization",
      overview: "Designed as an academic core DBMS project to simulate municipal and inter-city transit operations with comprehensive relational integrity constraints.",
      listFeatures: [
        "Relational database schema with primary and foreign key constraints",
        "Entity-Relationship diagrams modeling route and bus schedules",
        "SQL queries managing ticket availability, route bookings, and transaction audits"
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
