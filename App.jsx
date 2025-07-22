
import { useState } from "react";

const categories = {
  Infrastructure: [
    "Secure Research Enclave (SRE)",
    "Landing Zone Accelerator (LZA)",
    "Secure Research Portal (SRP)"
  ],
  Enablement: [
    "Immersion Days",
    "AWS Cloud Credits",
    "CloudStart Grant Coaching"
  ],
  Compliance: [
    "NIH Genomic Data Sharing (GDS) Readiness",
    "CMMC / NIST 800-171 Framework",
    "SSP and Audit Documentation"
  ],
  Commercialization: [
    "Startup Collaboration Program",
    "Activate Credits for Spinouts",
    "Joint Steering Committee"
  ],
  Talent: [
    "AWS Academy Student Research Pairing",
    "Research Workforce Upskilling",
    "Postdoc-to-Cloud Pathways"
  ]
};

export default function App() {
  const [selected, setSelected] = useState([]);
  const [institutionName, setInstitutionName] = useState("");
  const [focusArea, setFocusArea] = useState("");

  const toggle = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const generateDoc = () => {
    const content = `
------------------------------
AWS Research Partnership Proposal
------------------------------

Institution: ${institutionName}
Focus Area: ${focusArea}

Selected Offerings:
${selected.map((s) => `- ${s}`).join("\n")}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = \`\${institutionName.replace(/\s+/g, '_')}_AWS_Research_Proposal.txt\`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Customize Your AWS Research Proposal</h1>
      <input
        placeholder="Institution Name"
        value={institutionName}
        onChange={(e) => setInstitutionName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <textarea
        placeholder="Focus Area (AI, Life Sciences, Compliance, etc)"
        value={focusArea}
        onChange={(e) => setFocusArea(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {Object.entries(categories).map(([cat, options]) => (
        <div key={cat}>
          <h2 className="text-xl font-semibold mt-4 mb-2">{cat}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggle(option)}
                className={\`cursor-pointer border p-3 rounded \${selected.includes(option) ? "border-blue-600 bg-blue-50" : "border-gray-300"}\`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={generateDoc} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
        Download Proposal
      </button>
    </div>
  );
}
