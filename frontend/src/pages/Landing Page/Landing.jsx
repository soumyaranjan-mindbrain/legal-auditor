 
 import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.jpeg";
import { Sun, Moon } from "lucide-react";

export default function LegalAuditorLandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const features = [
    {
      title: "AI Contract Analysis",
      desc: "Upload legal documents and instantly detect risks, obligations, and hidden clauses with advanced AI auditing.",
      icon: "⚖️",
    },
    {
      title: "Compliance Monitoring",
      desc: "Ensure regulatory alignment across GDPR, HIPAA, corporate policies, and jurisdiction-specific laws.",
      icon: "🛡️",
    },
    {
      title: "Risk Scoring",
      desc: "Generate legal risk scores with actionable insights for faster business decisions.",
      icon: "📊",
    },
    {
      title: "Jurisdiction Validation",
      desc: "Verify clauses and legal frameworks across multiple countries and legal systems.",
      icon: "🌍",
    },
  ];

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Background GIF */}
      <div
        className="absolute inset-0  bg-cover bg-center bg-no-repeat bg-opacity-100"
        // className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage:
            "url('https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aHZqYnJ4NnY4MmFnZ3RtY3ExNGoxaWUyMmU1NXRkZnExMmxvMHIxMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6cOkTE36mcUsXjlexH/giphy.webp')",
            // "url('https://media4.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NmtwMGJhdjh4eGRicnRxZmUweDluZm1ueWFxcHFyazllYWN4M3k1NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JniLgiQ5jEuIxzwUfB/giphy.webp')",
        }}
      />
      {/* <div className="absolute inset-0 flex items-center justify-center overflow-hidden"/> */}


      {/* Overlay */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          darkMode ? "bg-slate-950/85" :"bg-[rgba(194,199,208,0.55)]"
        }`}
      />

      {/* Gradient Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.15),_transparent_40%)]" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <header
          className={`border-b sticky top-0 z-20 backdrop-blur-xl ${
            darkMode
              ? "border-slate-800 bg-slate-950/50"
              : "border-slate-300 bg-white/70"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Legal Auditor Logo"
                className="w-12 h-12 object-contain rounded-xl shadow-lg"
              />

              <div className="text-2xl font-bold tracking-tight">
                Legal<span className="text-blue-500">Auditor</span>
              </div>
            </div>

            {/* Navigation */}
            <nav
              className={`hidden md:flex gap-8 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <a href="#features" className="hover:text-blue-500 transition">
                Features
              </a>
              <a href="#workflow" className="hover:text-blue-500 transition">
                Workflow
              </a>
              {/* <a href="#pricing" className="hover:text-blue-500 transition">
                Pricing
              </a> */}
              <a href="#footer" className="hover:text-blue-500 transition">
                Contact
              </a>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl border transition ${
                  darkMode
                    ? "bg-slate-900 border-slate-700 text-yellow-400"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* CTA Button */}
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-2xl font-medium shadow-lg shadow-blue-600/20 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 ${
                darkMode
                  ? "bg-slate-900/70 border border-slate-800 text-slate-300"
                  : "bg-white/70 border border-slate-300 text-slate-700"
              }`}
            >
              Trusted by Legal Teams & Enterprises
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              AI-Powered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Legal Auditing
              </span>
            </h1>

            <p
              className={`text-lg mb-8 max-w-xl ${
                darkMode ? "text-slate-400" : "text-slate-700"
              }`}
            >
              Automate compliance checks, contract reviews, risk detection,
              and jurisdiction analysis with enterprise-grade security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl transition"
              >
                Start Free Trial
              </button>

              <button
                onClick={() => navigate("/signup")}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition border ${
                  darkMode
                    ? "border-slate-700 hover:border-slate-500"
                    : "border-slate-300 hover:border-slate-500"
                }`}
              >
                Book Demo
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div
            className={`rounded-3xl shadow-2xl p-8 backdrop-blur-xl border ${
              darkMode
                ? "bg-slate-900/70 border-slate-800"
                : "bg-white/80 border-slate-300"
            }`}
          >
            <h3 className="font-semibold text-xl mb-6">
              Contract Risk Dashboard
            </h3>

            <div className="space-y-4">
              <div
                className={`rounded-2xl p-4 ${
                  darkMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span>Compliance Score</span>
                  <span className="text-blue-400">94%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full">
                  <div className="w-[94%] h-2 bg-blue-500 rounded-full" />
                </div>
              </div>

              <div
                className={`rounded-2xl p-4 ${
                  darkMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              >
                <div className="text-red-400 font-medium">
                  3 High-Risk Clauses Detected
                </div>
                <p className="text-sm mt-2 text-slate-500">
                  Termination terms, indemnity exposure, and missing
                  confidentiality provisions.
                </p>
              </div>

              <div
                className={`rounded-2xl p-4 ${
                  darkMode ? "bg-slate-800" : "bg-slate-200"
                }`}
              >
                <div className="text-purple-400 font-medium">
                  Jurisdiction Match
                </div>
                <p className="text-sm mt-2 text-slate-500">
                  Validated for India, US, and EU frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>

{/* Enhanced Features Section */}
<section id="features" className="max-w-7xl mx-auto px-6 py-24">
  <div className="text-center mb-16">
    {/* Badge */}
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
        darkMode
          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          : "bg-blue-100 text-blue-700 border border-blue-200"
      }`}
    >
      ⚡ Advanced AI Legal Solutions
    </div>

    <h2
      className={`text-4xl md:text-5xl font-bold mb-4 ${
        darkMode ? "text-white" : "text-slate-900"
      }`}
    >
      Powerful Legal Intelligence
    </h2>

    <p
      className={`max-w-2xl mx-auto text-lg ${
        darkMode ? "text-slate-400" : "text-slate-700"
      }`}
    >
      Built for law firms, enterprises, startups, and compliance teams.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {features.map((feature, index) => (
      <div
        key={index}
        className={`group rounded-3xl p-8 transition-all duration-300 shadow-lg border text-center hover:-translate-y-3 ${
          darkMode
            ? "bg-slate-900/70 border-slate-800 hover:border-blue-500/40 hover:shadow-blue-500/10"
            : "bg-white/80 border-slate-300 hover:border-blue-400 hover:shadow-xl"
        }`}
      >
        {/* Circle Icon */}
        <div
          className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl border-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
            darkMode
              ? "border-blue-500 bg-slate-800 text-white shadow-lg shadow-blue-500/20"
              : "border-blue-400 bg-slate-100 text-slate-900 shadow-md"
          }`}
        >
          {feature.icon}
        </div>

        {/* Feature Title */}
        <h3
          className={`text-xl font-semibold mb-3 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p
          className={`leading-relaxed text-sm mb-5 ${
            darkMode ? "text-slate-400" : "text-slate-700"
          }`}
        >
          {feature.desc}
        </p>

        {/* Learn More Button */}
        <button
          className={`text-sm font-medium transition ${
            darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-500"
          }`}
        >
          Learn More →
        </button>
      </div>
    ))}
  </div>

  {/* Bottom Stats Section */}
  <section id="workflow">

<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
    {[
      { number: "10K+", label: "Contracts Reviewed" },
      { number: "99%", label: "Compliance Accuracy" },
      { number: "50+", label: "Global Jurisdictions" },
      { number: "24/7", label: "AI Monitoring" },
    ].map((stat, idx) => (
      <div key={idx}>
        <h3
          className={`text-3xl font-bold ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {stat.number}
        </h3>
        <p
          className={`mt-2 text-sm ${
            darkMode ? "text-slate-400" : "text-slate-700"
          }`}
        >
          {stat.label}
        </p>
      </div>
    ))}
  </div>
  </section>
</section>



        {/* Footer */}
        <section id="footer">
<footer
  className={`border-t mt-20 ${
    darkMode
      ? "border-slate-800 bg-slate-950/80"
      : "border-slate-300 bg-white/70"
  } backdrop-blur-xl`}
>
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid md:grid-cols-4 gap-10">
      
      {/* Brand Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={logo}
            alt="Legal Auditor Logo"
            className="w-12 h-12 object-contain rounded-xl shadow-lg"
          />
          <div className="text-2xl font-bold tracking-tight">
            Legal<span className="text-blue-500">Auditor</span>
          </div>
        </div>
        <p
          className={`text-sm leading-relaxed ${
            darkMode ? "text-slate-400" : "text-slate-700"
          }`}
        >
          AI-powered legal intelligence platform for contract analysis,
          compliance monitoring, and enterprise-grade risk detection.
        </p>
      </div>

      {/* Product Links */}
      <div>
        <h4 className="font-semibold mb-4">Product</h4>
        <ul
          className={`space-y-2 text-sm ${
            darkMode ? "text-slate-400" : "text-slate-700"
          }`}
        >
          <li><a href="#features" className="hover:text-blue-500">Features</a></li>
          <li><a href="#workflow" className="hover:text-blue-500">Workflow</a></li>
          <li><a href="#pricing" className="hover:text-blue-500">Pricing</a></li>
          <li><a href="#contact" className="hover:text-blue-500">Support</a></li>
        </ul>
      </div>

      {/* Legal Links */}

      <div>
        <h4 className="font-semibold mb-4">Legal</h4>
        <ul
          className={`space-y-2 text-sm ${
            darkMode ? "text-slate-400" : "text-slate-700"
          }`}
        >
          <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-500">Terms of Service</a></li>
          <li><a href="#" className="hover:text-blue-500">Compliance</a></li>
          <li><a href="#" className="hover:text-blue-500">Security</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-semibold mb-4">Contact</h4>
        <ul
          className={`space-y-2 text-sm ${
            darkMode ? "text-slate-400" : "text-slate-700"
          }`}
        >
          <li>Email: support@legalauditor.ai</li>
          <li>Phone: +91 98765 43210</li>
          <li>Bhubaneswar, Odisha, India</li>
        </ul>
      </div>
    </div>

    {/* Bottom Line */}
    <div
      className={`border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm ${
        darkMode
          ? "border-slate-800 text-slate-500"
          : "border-slate-300 text-slate-600"
      }`}
    >
      <p>© 2026 LegalAuditor. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-blue-500">LinkedIn</a>
        <a href="#" className="hover:text-blue-500">Twitter</a>
        <a href="#" className="hover:text-blue-500">GitHub</a>
      </div>
    </div>
  </div>
</footer>
        </section>

        {/* Marquee Section Above Footer */}
<div
  className={`border-t border-b overflow-hidden py-3 ${
    darkMode
      ? "border-slate-800 bg-slate-900/70"
      : "border-slate-300 bg-white/60"
  }`}
>
  <marquee
    behavior="scroll"
    direction="left"
    scrollamount="6"
    className={`font-medium text-sm tracking-wide ${
      darkMode ? "text-blue-400" : "text-blue-700"
    }`}
  >
    ⚖️ AI Contract Analysis • 🛡️ Compliance Monitoring • 📊 Risk Scoring • 🌍
    Jurisdiction Validation • 🔒 Enterprise Security • 🚀 Trusted by Global
    Legal Teams •
  </marquee>
</div>
      </div>
    </div>
  );
}
