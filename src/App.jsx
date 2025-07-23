import React, { useState } from "react";
import { jsPDF } from "jspdf";

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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(255, 153, 0); // AWS orange
    doc.text("AWS Research Partnership Letter", 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`To: ${institutionName}`, 14, 30);
    doc.text(
      `AWS proposes the following tailored research engagement framework to support innovation, security, and scalability for your institution.`,
      14,
      40,
      { maxWidth: 180 }
    );

    let y = 55;

    Object.entries(selected).forEach(([category, items]) => {
      doc.setTextColor(35, 47, 62); // AWS dark blue
      doc.setFontSize(14);
      doc.text(category, 14, y);
      y += 8;

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      items.forEach((item) => {
        doc.text(`- ${item}`, 18, y);
        y += 7;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      y += 10;
    });

    doc.text(
      `AWS will work in partnership with ${institutionName} to enable best-in-class research, accelerate time to insight, and prepare researchers with compliant and cost-effective cloud resources.`,
      14,
      y,
      { maxWidth: 180 }
    );

    doc.save(`${institutionName.replace(/\s+/g, "_")}_AWS_Partnership_Letter.pdf`);
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
          {options.map((opt) => (
            <label key={opt} className="block mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={selected[category]?.includes(opt) || false}
                onChange={() => handleChange(category, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <div className="text-right mt-6">
        <button
          onClick={generatePDF}
          disabled={!institutionName}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Download PDF Partnership Letter
        </button>
      </div>
    </div>
  );
}
