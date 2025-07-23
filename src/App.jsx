import React, { useState } from "react";
import { jsPDF } from "jspdf";
import logo from "./aws-logo.png";
import diagram from "./aws-diagram.png";

const researchOptions = {
  "Compliance & Secure Research Environment (SRE)": [
    "CMMC/NIST Documentation Support",
    "Certification Eligibility (FedRAMP, CMMC, HIPAA/NIST)",
    "SRE Deployment (AWS Native)",
    "Research Data Governance"
  ],
  "Events & Seminars": [
    "AWS Immersion Day",
    "AWS Research Seminar Series",
    "Annual AWS Sponsored Research Conference"
  ],
  "Faculty Incentives": [
    "New Faculty Onboarding Package",
    "Executive Credit Program for Existing Faculty/Researchers"
  ],
  "Grant Support": [
    "Letter of Support for Proposal",
    "AWS Letter of Collaboration for Grant Submissions"
  ],
  "Research Commercialization": [
    "Startup Collaboration Program",
    "AWS Credits for Startups",
    "Startup Immersion Days",
    "Joint Steering Committee (JSC)",
    "AWS BD Liaison Assignment",
    "Working Backwards Sessions",
    "Innovation Enablement",
    "Case Study Development"
  ],
  "Research Enablement": [
    "Cloud Credit for Research",
    "Amazon Research Awards",
    "Published Blogs and Case Studies",
    "Research Office Hours with AWS Experts",
    "Development of Center of Excellence for Research in the Cloud"
  ],
  "Research Infrastructure": [
    "HPC Cluster On Demand",
    "Landing Zone/Control Tower Creation",
    "Business Operations Setup (Account vending, billing, budgeting)",
    "Research Data Repository",
    "Hybrid Storage and File Caching",
    "Access to Accelerated Computing (GPU, FPGA, Quantum)",
    "Quantum Computing @ AWS"
  ],
  "Student/University Engagement": [
    "Cloud Trained Student Pairing",
    "Analysis of On-Prem Cluster Utilization",
    "Waiving Indirect Costs for Cloud Research"
  ]
};

const categoryDescriptions = {
  "Compliance & Secure Research Environment (SRE)": "Support for institutional compliance with cybersecurity frameworks such as CMMC, FedRAMP, and HIPAA/NIST, including deployment of secure AWS-native research environments.",
  "Events & Seminars": "AWS-hosted training and research-focused events to promote cloud fluency and academic collaboration.",
  "Faculty Incentives": "Onboarding and enablement resources tailored to support faculty researchers at all stages.",
  "Grant Support": "Official AWS collaboration and endorsement documentation to strengthen research funding proposals.",
  "Research Commercialization": "Programs to transition academic research into startup pathways or commercial ventures.",
  "Research Enablement": "Cloud credits, guidance, and tools that directly accelerate academic research outcomes.",
  "Research Infrastructure": "Access to scalable compute, storage, and governance tooling for research workloads.",
  "Student/University Engagement": "Hands-on programs to involve students, track on-prem usage, and encourage cloud experimentation."
};

export default function ResearchDealBuilder() {
  const [selected, setSelected] = useState({});
  const [institutionName, setInstitutionName] = useState("");

  const handleChange = (category, option) => {
    setSelected((prev) => {
      const current = prev[category] || [];
      const exists = current.includes(option);
      const updated = exists ? current.filter(o => o !== option) : [...current, option];
      return { ...prev, [category]: updated };
    });
  };

  const resetForm = () => {
    setSelected({});
    setInstitutionName("");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(255, 153, 0);
    doc.text("Amazon Web Services (AWS)", 20, 20);
    doc.setFontSize(16);
    doc.text("Research Partnership Framework", 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Institution: ${institutionName}`, 20, 40);
    doc.text("AWS is pleased to present a tailored partnership framework to support the mission-critical research efforts of your institution. This document outlines proposed collaboration categories and service offerings that reflect AWS’s commitment to secure, scalable, and innovative cloud-based research.", 20, 50, { maxWidth: 170 });

    let y = 70;
    Object.entries(selected).forEach(([category, items]) => {
      doc.setFontSize(14);
      doc.setTextColor(35, 47, 62);
      doc.text(category, 20, y);
      y += 6;

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      items.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 6;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
      y += 4;
    });

    doc.setFontSize(12);
    doc.text("We look forward to exploring this collaboration to deliver meaningful research outcomes, accelerate discovery, and foster long-term innovation.", 20, y, { maxWidth: 170 });
    y += 20;

    const img = new Image();
    img.src = diagram;
    img.onload = () => {
      doc.addPage();
      doc.addImage(img, "PNG", 20, 20, 170, 100);
      doc.save(`${institutionName.replace(/\s+/g, "_")}_AWS_Partnership_Framework.pdf`);
    };
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans text-gray-900 bg-white">
      <div className="mb-6 flex items-center justify-between">
        <img
          src="https://d0.awsstatic.com/logos/powered-by-aws.png"
          alt="AWS Logo"
          className="h-12"
        />
        <h1 className="text-3xl font-bold text-orange-500">AWS Research Partnership Builder</h1>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Institution Name:
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g., University of Louisville"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
        />
      </div>

      {Object.entries(researchOptions).map(([category, options]) => (
        <div key={category} className="my-6 border border-gray-200 rounded shadow-sm p-4">
          <h2 className="text-xl font-semibold text-orange-600 mb-2">{category}</h2>
          <p className="text-sm text-gray-600 mb-4">{categoryDescriptions[category]}</p>
          {options.map((opt) => (
            <label key={opt} className="block mb-3 text-gray-800">
              <input
                type="checkbox"
                className="mr-2 accent-orange-500"
                checked={selected[category]?.includes(opt) || false}
                onChange={() => handleChange(category, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <div className="text-right mt-6 space-x-4">
        <button
          onClick={resetForm}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset Form
        </button>
        <button
          onClick={generatePDF}
          disabled={!institutionName}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Download Partnership PDF
        </button>
      </div>
    </div>
  );
}
