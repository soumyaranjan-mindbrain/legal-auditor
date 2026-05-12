import { useState, useEffect } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileSearch,
  FileText,
  Fingerprint,
  Gauge,
  Layers3,
  LockKeyhole,
  Scale,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  UploadCloud,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";

const navItems = [
  ["Platform", "platform"],
  ["Benefits", "benefits"],
  ["Workflow", "workflow"],
  ["Reviews", "reviews"],
];

const platformCards = [
  {
    icon: FileSearch,
    title: "AI Legal Document Audit",
    text: "Upload agreements, policies, notices, or case files and receive structured issue spotting across clauses, obligations, dates, and hidden legal exposure.",
  },
  {
    icon: Gauge,
    title: "Risk Scoring & Priority Review",
    text: "Every finding is ranked by severity so teams can focus first on indemnity gaps, liability caps, missing exceptions, compliance conflicts, and high-risk terms.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-Ready Audit Trail",
    text: "Maintain traceable review history, role-based access, admin oversight, and defensible audit records for internal legal and compliance operations.",
  },
];



const benefits = [
  {
    icon: UploadCloud,
    title: "Fast Document Intake",
    text: "Centralize legal uploads and route files into an audit-ready workflow without manual handoffs.",
  },
  {
    icon: AlertTriangle,
    title: "Clause-Level Risk Flags",
    text: "Detect ambiguous terms, missing carve-outs, unfavorable obligations, and compliance-sensitive provisions.",
  },
  {
    icon: BarChart3,
    title: "Executive Risk Insights",
    text: "Give stakeholders a clear view of document status, severity mix, turnaround, and active legal exposure.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Role Access",
    text: "Support client, admin, and super-admin flows with controlled visibility across audits and compliance modules.",
  },
  {
    icon: Sparkles,
    title: "AI Reasoning Summaries",
    text: "Explain why a clause is risky and what legal team members should verify before approval.",
  },
  {
    icon: ClipboardCheck,
    title: "Review-Ready Reports",
    text: "Transform findings into clear summaries that help legal teams take action faster.",
  },
];

const workflow = [
  {
    id: "01",
    title: "Upload Legal Files",
    items: ["Add contracts, policies, notices, or supporting evidence.", "Capture client matter context.", "Prepare files for AI-assisted review."],
  },
  {
    id: "02",
    title: "Extract Clauses & Metadata",
    items: ["Identify parties, dates, terms, obligations, and clause families.", "Separate critical provisions from boilerplate.", "Create structured audit records."],
  },
  {
    id: "03",
    title: "Score Legal Risk",
    items: ["Classify issues by severity.", "Explain the reasoning behind each flag.", "Surface compliance and security concerns."],
  },
  {
    id: "04",
    title: "Review, Assign, Resolve",
    items: ["Send priority findings to reviewers.", "Track resolution status.", "Preserve an audit trail for governance."],
  },
];



const comparison = [
  ["Clause-Level AI Audit", true, false],
  ["Risk Severity Scoring", true, true],
  ["Compliance Dashboard", true, false],
  ["Role-Based Admin Controls", true, false],
  ["Audit Trail & Review History", true, true],
  ["Legal Reasoning Summaries", true, false],
];

const faqs = [
  [
    "What does MBI Legal Auditor review?",
    "It is designed for legal documents such as contracts, policies, client files, compliance records, notices, and supporting matter documents.",
  ],
  [
    "Does it replace a lawyer?",
    "No. It helps legal and compliance teams triage faster, identify risks, and prepare cleaner review material for human decision-making.",
  ],
  [
    "What risks can the system flag?",
    "It can highlight clause ambiguity, missing exceptions, liability exposure, compliance conflicts, unusual obligations, security concerns, and review priorities.",
  ],
  [
    "Can admins monitor multiple clients?",
    "Yes. The product supports client audit views, admin operations, and super-admin compliance oversight.",
  ],
  [
    "Is this built for secure legal workflows?",
    "Yes. The landing page emphasizes the same system priorities as the app: secure uploads, controlled access, audit history, and compliance visibility.",
  ],
];

const reviews = [
  ["Nexus Legal Group", "Legal operations team", '"The audit queue helped us separate urgent clause risks from routine review work in minutes."'],
  ["Global Finance", "Compliance office", '"The severity scoring made executive review much easier. Everyone could see which documents needed attention first."'],
  ["Clairant Services", "General counsel", '"The reasoning summaries gave our team a useful first pass before senior counsel reviewed the final position."'],
  ["Hanko Advisory", "Risk management", '"The dashboard view finally connected document status, compliance activity, and reviewer workload in one place."'],
  ["Talik Partners", "Contract team", '"Upload, audit, assign, resolve. The workflow is clear enough for legal and business stakeholders."'],
  ["Janlo Systems", "Security admin", '"Role visibility and audit history are exactly what we needed for internal governance."'],
];



function Button({ children, variant = "dark", href = "#platform" }) {
  return (
    <a className={`button ${variant}`} href={href}>
      {children}
    </a>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="MBI Legal Auditor home">
      <span className="brand-mark">
        <Scale size={19} />
      </span>
      <span>MBI Legal Auditor</span>
    </a>
  );
}



function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <Brand />
          <nav aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Button variant="light" href="/login">Login</Button>
            <Button href="/signup">Get Started</Button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">

          <h1>Audit Legal Documents Before Risk Reaches the Business.</h1>
          <p>
            MBI Legal Auditor helps teams upload documents, detect clause-level risk, review AI reasoning,
            monitor compliance, and manage client audits from one secure workspace.
          </p>


        </div>

      </section>



      <section className="advantages section" id="platform">
        <SectionIntro
          eyebrow="LEGAL AUDIT PLATFORM"
          title="Built for Document Risk Intelligence"
          text="Replace scattered manual checks with a structured legal audit workflow that turns uploaded documents into prioritized, explainable findings."
        />
        <div className="advantage-grid">
          {platformCards.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

      </section>

      <section className="benefits section" id="benefits">
        <SectionIntro
          eyebrow="BENEFITS"
          title="Legal Review, Organized"
          text="Give legal teams a faster way to understand document quality, risk priority, reviewer workload, and compliance exposure."
        />
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <span className="icon-badge"><Icon size={24} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section" id="workflow">
        <SectionIntro
          eyebrow="AUDIT WORKFLOW"
          title="From Upload to Resolution"
          text="A clear review path for client submissions, AI-assisted findings, admin triage, and compliance-ready closure."
        />
        <div className="process-grid">
          {workflow.map((step) => (
            <article key={step.id} className="step-card">
              <span>{step.id}</span>
              <h3>{step.title}</h3>
              {step.items.map((item) => (
                <p key={item}><Check size={15} />{item}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="comparison section">
        <SectionIntro
          eyebrow="COMPARISON"
          title="AI Audit vs. Manual Review Queue"
          text="MBI Legal Auditor gives teams structure before final legal judgment: faster triage, clearer risk, and stronger governance records."
        />
        <div className="compare-table">
          <div className="table-head"><span>CAPABILITY</span><strong>MBI</strong><strong>Manual</strong></div>
          {comparison.map(([label, mbi, manual]) => (
            <div className="table-row" key={label}>
              <span>{label}</span>
              <strong>{mbi ? <Check /> : "-"}</strong>
              <strong>{manual ? <Check /> : "-"}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="faq section">
        <SectionIntro
          eyebrow="FAQ"
          title="Questions Legal Teams Ask"
          text="Clear answers for reviewers, admins, compliance officers, and client teams evaluating the audit workflow."
        />
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}<ChevronDown size={18} /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="reviews section" id="reviews">
        <SectionIntro eyebrow="REVIEWS" title="Trusted by Legal Operations Teams" />
        <div className="review-grid">
          {reviews.map(([name, role, quote]) => (
            <article className="review-card" key={name}>
              <div className="stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p>{quote}</p>
              <div className="profile">
                <span className="profile-mark"><UsersRound size={18} /></span>
                <div>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>




      <footer>
        <Brand />
        <span>© 2026 MBI Legal Auditor</span>
        <span>AI-assisted legal review for compliance-conscious teams.</span>
      </footer>
    </main>
  );
}

export default App;
