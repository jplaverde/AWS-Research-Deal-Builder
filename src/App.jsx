import React, { useState } from "react";

const researchOptions = {
  "Compliance Readiness": [
    "CMMC/NIST Documentation Support",
    "Certification Eligibility (FedRAMP, CMMC, HIPAA/NIST)",
  ],
  "Events & Seminars": [
    "AWS Immersion Day",
    "AWS Research Seminar Series",
    "Annual AWS Sponsored Research Conference",
  ],
  "Faculty Incentives": [
    "New Faculty Onboarding Package",
    "Executive Credit Program for Existing Faculty/Researchers",
  ],
  "Grant Support": [
    "Letter of Support for Proposal",
    "AWS Letter of Collaboration for Grant Submissions",
  ],
  "Research Commercialization": [
    "Startup Collaboration Program",
    "AWS Credits for Startups",
    "Startup Immersion Days",
    "Joint Steering Committee (JSC)",
    "AWS BD Liaison Assignment",
    "Working Backwards Sessions",
    "Innovation Enablement",
    "Case Study Development",
  ],
  "Research Enablement": [
    "Cloud Credit for Research",
    "Amazon Research Awards",
    "Published Blogs and Case Studies",
    "Research Office Hours with AWS Experts",
    "Development of Center of Excellence for Research in the Cloud",
  ],
  "Research Infrastructure": [
    "HPC Cluster On Demand",
    "Landing Zone/Control Tower Creation",
    "Business Operations Setup (Account vending, billing, budgeting)",
    "Research Data Repository",
    "Hybrid Storage and File Caching",
    "Access to Accelerated Computing (GPU, FPGA, Quantum)",
    "Quantum Computing @ AWS",
  ],
  "Secure Research Environment (SRE)": [
    "SRE Deployment (AWS Native)",
    "Research Data Governance",
  ],
  "Student/University Engagement": [
    "Cloud Trained Student Pairing",
    "Analysis of On-Prem Cluster Utilization",
    "Waiving Indirect Costs for Cloud Research",
  ],
};

export default function App() {
  const [selected, setSelected] = useState([]);
  const [institutionName, setInstitutionName] = useState("");

  const toggle = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const generateDocument = () => {
    const content = `AWS Research Partnership Proposal\n\nInstitution: ${institutionName}\n\nSelected Offerings by Category:\n\n${Object.entries(researchOptions)
      .map(([category, options]) => {
        const selectedOptions = options.filter((opt) =>
          selected.includes(opt)
        );
        if (selectedOptions.length === 0) return null;
        return `### ${category}\n${selectedOptions
          .map((opt) => `- ${opt}`)
          .join("\n")}`;
      })
      .filter(Boolean)
      .join("\n\n")}\n\nAWS is proud to support ${institutionName} with tailored resources in research enablement, infrastructure, commercialization, and compliance.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${institutionName.replace(/\s+/g, "_")}_AWS_Research_Proposal.txt`;
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
        <h1 className="text-3xl font-bold">AWS Research Deal Builder</h1>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">
          Institution Name:
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., University of Example"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
        />
      </div>

      {Object.entries(researchOptions).map(([category, options]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggle(option)}
                className={`cursor-pointer border p-3 rounded shadow-sm transition duration-150 ease-in-out ${
                  selected.includes(option)
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <button
          onClick={generateDocument}
          disabled={!institutionName || selected.length === 0}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Download Proposal Document
        </button>
      </div>
    </div>
  );
}
