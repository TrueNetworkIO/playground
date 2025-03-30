import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExecutionResult } from "@/shared/schema";

interface VisualizationProps {
  result: ExecutionResult | null;
}

export function Visualization({ result }: VisualizationProps) {
  const [viewType, setViewType] = useState<"graph" | "tree">("graph");
  
  if (!result || !result.data) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-neutral-500">No data to visualize</p>
          <p className="text-neutral-400 text-sm mt-1">Run your code to see visualizations</p>
        </div>
      </div>
    );
  }
  
  // Check if attestation data is present
  const hasAttestationData = result.data.attestation || (result.data.data && result.data.data.attestation);
  
  // Extract attestation data if present
  const attestation = result.data.attestation || (result.data.data && result.data.data.attestation);
  
  // Check if reputation data is present
  const hasReputationData = result.data.scores || (result.data.data && result.data.data.scores);
  const scores = result.data.scores || (result.data.data && result.data.data.scores);

  return (
    <div className="p-4">
      <div className="bg-white border border-neutral-200 rounded-md shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">{hasAttestationData ? "Attestation Visualization" : "Result Visualization"}</h3>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant={viewType === "graph" ? "default" : "outline"} 
              onClick={() => setViewType("graph")}
              className="text-xs px-2 py-1 h-auto"
            >
              Graph View
            </Button>
            <Button 
              size="sm" 
              variant={viewType === "tree" ? "default" : "outline"} 
              onClick={() => setViewType("tree")}
              className="text-xs px-2 py-1 h-auto"
            >
              Tree View
            </Button>
          </div>
        </div>
        
        {/* Visualization content */}
        <div className="h-60 bg-neutral-50 rounded-md border border-neutral-200 flex items-center justify-center relative overflow-hidden">
          {hasAttestationData && viewType === "graph" && (
            <>
              {/* Issuer */}
              <div className="absolute" style={{ top: "45%", left: "30%" }}>
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-xs font-medium text-center mt-1">Issuer</div>
                <div className="text-xs text-neutral-500 text-center">
                  {attestation.issuer.substring(0, 6)}...{attestation.issuer.substring(attestation.issuer.length - 4)}
                </div>
              </div>
              
              {/* Subject */}
              <div className="absolute" style={{ top: "45%", left: "65%" }}>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-xs font-medium text-center mt-1">Subject</div>
                <div className="text-xs text-neutral-500 text-center">
                  {attestation.subject.substring(0, 6)}...{attestation.subject.substring(attestation.subject.length - 4)}
                </div>
              </div>
              
              {/* Arrow connecting the nodes */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-neutral-200 h-0.5 w-24 relative">
                  <div className="absolute -right-1 -top-1.5 border-l-8 border-t-4 border-b-4 border-l-neutral-300 border-t-transparent border-b-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-medium border border-neutral-200 rounded-md whitespace-nowrap">
                    {attestation.property}: {attestation.value}
                  </div>
                </div>
              </div>
            </>
          )}
          
          {hasReputationData && viewType === "graph" && (
            <div className="w-full h-full p-4 flex justify-center items-center">
              {/* Simple bar chart for scores */}
              <div className="flex items-end h-40 space-x-8">
                {scores.map((score: any, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-primary-500 rounded-t" 
                      style={{ height: `${(score.score / 100) * 120}px` }}
                    ></div>
                    <div className="text-xs font-medium mt-1">{score.score}</div>
                    <div className="text-xs text-neutral-500 truncate w-20 text-center">
                      {score.address.substring(0, 6)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {viewType === "tree" && (
            <div className="w-full h-full overflow-auto p-4">
              <div className="text-sm font-mono bg-white p-2 rounded border border-neutral-200">
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
          
          {!hasAttestationData && !hasReputationData && (
            <div className="text-center text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <p>No structured data to visualize</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
