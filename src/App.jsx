import React, { useState } from "react";

const researchOptions = {
  "Compliance Readiness": [
    "CMMC/NIST Documentation Support",
    "Certification Eligibility (FedRAMP, CMMC, HIPAA/NIST)"
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
  "Secure Research Environment (SRE)": [
    "SRE Deployment (AWS Native)",
    "Research Data Governance"
  ],
  "Student/University Engagement": [
    "Cloud Trained Student Pairing",
    "Analysis of On-Prem Cluster Utilization",
    "Waiving Indirect Costs for Cloud Research"
  ]
};

const categoryDescriptions = {
  "Compliance Readiness": "Support for institutional compliance with cybersecurity frameworks such as CMMC, FedRAMP, and HIPAA/NIST.",
  "Events & Seminars": "AWS-hosted training and research-focused events to promote cloud fluency and academic collaboration.",
  "Faculty Incentives": "Onboarding and enablement resources tailored to support faculty researchers at all stages.",
  "Grant Support": "Official AWS collaboration and endorsement documentation to strengthen research funding proposals.",
  "Research Commercialization": "Programs to transition academic research into startup pathways or commercial ventures.",
  "Research Enablement": "Cloud credits, guidance, and tools that directly accelerate academic research outcomes.",
  "Research Infrastructure": "Access to scalable compute, storage, and governance tooling for research workloads.",
  "Secure Research Environment (SRE)": "Turnkey AWS-native environments for secure data analysis, enclave research, and compliance-aligned science.",
  "Student/University Engagement": "Hands-on programs to involve students, track on-prem usage, and encourage cloud experimentation."
};

export default function ResearchDealBuilder() {
  const [selected, setSelected] = useState({});
  const [institutionName, setInstitutionName] = useState("");

  const handleChange = (category, option) => {
    setSelected((prev) => ({ ...prev, [category]: option }));
  };

  const generateDocument = () => {
    const content = `AWS Research Partnership Letter\n\nTo: ${institutionName}\n\nAWS proposes the following tailored research engagement framework to support innovation, security, and scalability for your institution.\n\n${Object.entries(researchOptions)
      .map(([category, options]) => {
        const selectedOption = selected[category];
        if (!selectedOption) return null;
        return `## ${category}\n${selectedOption}`;
      })
      .filter(Boolean)
      .join("\n\n")}\n\nAWS will work in partnership with ${institutionName} to enable best-in-class research, accelerate time to insight, and prepare researchers with compliant and cost-effective cloud resources.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${institutionName.replace(/\s+/g, '_')}_AWS_Research_Partnership_Letter.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans text-gray-900">
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
          <p className="text-sm text-gray-600 mb-2">{categoryDescriptions[category]}</p>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={(e) => handleChange(category, e.target.value)}
            value={selected[category] || ""}
          >
            <option value="">Select an option...</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="text-right mt-6">
        <button
          onClick={generateDocument}
          disabled={!institutionName}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Download Partnership Letter
        </button>
      </div>
    </div>
  );
}
