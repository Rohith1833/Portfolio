# SPIDEY PORTFOLIO V2.0 — Rohith Gowda S.

A high-performance, dark cinematic, Spider-Man-inspired developer portfolio built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Engineered to showcase applied AI prompt optimization systems, machine learning regression pipelines, NLP aspect analytics, and full-stack software applications.

Live: [https://rohisportfolio.netlify.app/](https://rohisportfolio.netlify.app/)

---

## 🕷️ Design System & Aesthetic

* **Spider-Man Inspired Creative Identity**: Dark cinematic palette (`#080808` near-black, `#121212` charcoal, `#eb4a42` primary vermilion red), glassmorphic cards, layered parallax depth, and subtle mathematical spider-web patterns.
* **Professional Engineering Aesthetic**: Clean visual hierarchy, typography (`Syne` + `JetBrains Mono`), smooth transitions, magnetic cursor interactions, and responsive geometric accents without cartoonish clutter.
* **Accessible & Motion-Aware**: WCAG AA color contrast, responsive mobile-first layouts, and automatic respect for `prefers-reduced-motion`.

---

## 🚀 Projects & Systems Architecture

### 01 — HumanIntent (Primary Featured Project)
* **Subtitle**: An Intent-Preserving Adaptive Prompt Optimization System.
* **Category**: AI Engineering / NLP / LLM Systems.
* **Stack**: Next.js, React, TypeScript, Python, FastAPI, Pydantic, Ollama, Llama 3, SQLite.
* **Architecture**: User Input → Deterministic Preprocessing → Intent & Constraint Extraction → Ambiguity Detection → Local LLM Generation → Deterministic Verification → Optimized Prompt.
* **Reported Benchmarks**:
  * 442/442 automated tests passed.
  * 10/10 blind evaluation probes passed.
  * P50 latency: 15.62s | P95 latency: 25.50s on NVIDIA RTX 3050 Laptop GPU via local Ollama inference.
  * Zero cloud API costs and zero data egress.

### 02 — Food Delivery Time Predictor
* **Subtitle**: Machine Learning-Based Food Delivery ETA Prediction.
* **Category**: Machine Learning / Regression.
* **Stack**: Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Joblib, Streamlit, Git/GitHub.
* **Architecture**: Kaggle Dataset (~45,000 records) → Cleaning → Haversine Distance Calculation → Preprocessing Pipeline (ColumnTransformer) → Regressor Training (LR / RF / GB) → Evaluation → Interactive Streamlit Interface.
* **Engineering Highlights**: Extracted clean numerical minutes from messy text targets, computed spherical distance using Haversine formula, and serialized a zero-skew ColumnTransformer pipeline via Joblib.

### 03 — LocalLens
* **Subtitle**: Restaurant Review Sentiment & Aspect-Based Opinion Analyzer.
* **Category**: Artificial Intelligence / NLP / Data Analytics.
* **Stack**: Python, Streamlit, Pandas, SQLite, VADER Sentiment, Altair, Regex, Restaurant Lexicon.
* **Architecture**: Review Input → Text Preprocessing → Clause Splitting → Aspect Detection → VADER Scoring → Aspect-Level Results → Dashboard.
* **5 Analyzed Dimensions**: Food, Service, Price, Cleanliness, Wait Time.
* **Benchmark Evaluation**: 74.5% Accuracy, 96.8% Positive Recall, 66.94% Precision, 79.15% F1 on 1,000 UCI Yelp review sentences.

### Additional Projects Preserved
* **Health Tracker PWA**: Full-stack progressive web app built with React, TypeScript, Express, Prisma ORM, and PostgreSQL.
* **IntelliSlide AI**: AI presentation builder in Python converting textbook PDFs into structured PPTX decks via PyMuPDF and Groq.
* **Bus Reservation System**: Academic relational DBMS modeling with MySQL Workbench and SQL schema constraints.

---

## 🛠️ Technical Capabilities & Skills

* **Programming**: Python, JavaScript, TypeScript
* **AI / Machine Learning**: Machine Learning, Scikit-learn, Regression, NLP, Sentiment Analysis, LLM Integration, Prompt Engineering, Local LLM Inference, Model Evaluation
* **Frameworks**: React, Next.js, FastAPI, Streamlit
* **Data & Tools**: Pandas, NumPy, SQLite, Git, GitHub, Ollama, Joblib

---

## ⚙️ Local Setup & Build

```bash
# Clone repository
git clone https://github.com/Rohith1833/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Production build and typecheck
npm run build

# Code linting
npm run lint
```

---

## 📬 Contact

* **Developer**: Rohith Gowda S.
* **Email**: [rohithmohith78@gmail.com](mailto:rohithmohith78@gmail.com)
* **GitHub**: [github.com/Rohith1833](https://github.com/Rohith1833)
* **LinkedIn**: [linkedin.com/in/rohith-gowda-s-449939339](https://www.linkedin.com/in/rohith-gowda-s-449939339/)
