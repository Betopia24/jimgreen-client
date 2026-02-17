// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Section } from "../AnalyzedAllviewDatails";
// import { useModifyRepordGraphMutation } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import { toast } from "sonner";

// interface Props {
//   report: any;
//   id: string;
// }

// const GraphSection: React.FC<Props> = ({ report, id }) => {
//   const [prompt, setPrompt] = useState("");
//   const [newGraphUrl, setNewGraphUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [graphModifyPost, { isLoading }] = useModifyRepordGraphMutation();
//   console.log(newGraphUrl);

//   const handleSubmit = async () => {
//     if (!prompt) return;

//     try {
//       setLoading(true);

//       const payload = {
//         reportId: id || report?.reportId,
//         prompt: prompt,
//       };

//       console.log("Submitting:", payload);

//       // Example API call
//       const res = await graphModifyPost(payload).unwrap();
//       if (res?.success) {
//         toast.success(res.message);
//         setNewGraphUrl(res.data.waterReport.parameter_graph.graph_url);
//       }

//       console.log("Response:", res);

//       setPrompt("");
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Section
//       title={
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
//           {/* Left Side Title */}
//           <h2 className="text-lg font-semibold">Parameter Comparison Graph</h2>

//           {/* Right Side Form */}
//           <div className="flex w-full lg:w-auto gap-2">
//             <input
//               type="text"
//               placeholder="Enter prompt..."
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               className="w-full lg:w-80 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             />

//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
//             >
//               {isLoading ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>
//       }
//     >
//       {/* Graph Section */}
//       <div className="w-full">
//         <div className="relative w-full aspect-[16/9]">
//           <Image
//             src={newGraphUrl || report?.parameter_graph?.graph_url}
//             alt="Parameter Comparison Graph"
//             fill
//             className="object-contain rounded-lg"
//             sizes="(max-width: 768px) 100vw,
//                    (max-width: 1200px) 80vw,
//                    1200px"
//             priority
//           />
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default GraphSection;

"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Section } from "../AnalyzedAllviewDatails";
import { useModifyRepordGraphMutation } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  report: any;
  id: string;
}

interface FormValues {
  prompt: string;
}

const GraphSection: React.FC<Props> = ({ report, id }) => {
  const [newGraphUrl, setNewGraphUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [graphModifyPost, { isLoading }] = useModifyRepordGraphMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange", // validate while typing
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setImageLoading(true);

      const payload = {
        reportId: id || report?.reportId,
        prompt: data.prompt,
      };

      const res = await graphModifyPost(payload).unwrap();

      if (res?.success) {
        toast.success(res.message);
        setNewGraphUrl(res.data.waterReport.parameter_graph.graph_url);
      }

      reset();
    } catch (error) {
      console.error(error);
      setImageLoading(false);
    }
  };

  const graphUrl = newGraphUrl || report?.parameter_graph?.graph_url;

  return (
    <Section
      title={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full"
        >
          <h2 className="text-lg font-semibold">Parameter Comparison Graph</h2>

          <div className="flex w-full lg:w-auto gap-2">
            <div className="w-full lg:w-80">
              <input
                type="text"
                placeholder="Enter prompt..."
                {...register("prompt", {
                  required: "Prompt is required",
                })}
                className={`w-full px-3 font-normal py-3 border text-sm rounded-md focus:outline-none focus:ring-2 ${
                  errors.prompt
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-primary"
                }`}
              />

              {errors.prompt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.prompt.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      }
    >
      <div className="w-full">
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
          {(isLoading || imageLoading) && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
              <Loader2 className="animate-spin w-8 h-8 text-primary" />
            </div>
          )}

          {graphUrl && (
            <Image
              src={graphUrl}
              alt="Parameter Comparison Graph"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 80vw,
                     1200px"
              priority
              onLoadingComplete={() => setImageLoading(false)}
              onLoadStart={() => setImageLoading(true)}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default GraphSection;
