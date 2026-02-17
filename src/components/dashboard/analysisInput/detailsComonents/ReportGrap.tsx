"use client";

import Image from "next/image";
import { useState } from "react";
import { Section } from "../AnalyzedAllviewDatails";

interface Props {
  report: any;
}

const GraphSection: React.FC<Props> = ({ report }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;

    try {
      setLoading(true);

      const payload = {
        reportId: report?._id || report?.reportId,
        prompt: prompt,
      };

      console.log("Submitting:", payload);

      // Example API call
      const res = await fetch("/api/update-graph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response:", data);

      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      title={
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
          {/* Left Side Title */}
          <h2 className="text-lg font-semibold">Parameter Comparison Graph</h2>

          {/* Right Side Form */}
          <div className="flex w-full lg:w-auto gap-2">
            <input
              type="text"
              placeholder="Enter prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full lg:w-80 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      }
    >
      {/* Graph Section */}
      <div className="w-full">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={report?.parameter_graph?.graph_url}
            alt="Parameter Comparison Graph"
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 80vw,
                   1200px"
            priority
          />
        </div>
      </div>
    </Section>
  );
};

export default GraphSection;
