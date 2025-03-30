import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import { ExecutionResult } from "@/shared/schema";

interface ResultsPanelProps {
  result: ExecutionResult | null;
  isLoading: boolean;
}

export function ResultsPanel({ result, isLoading }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState("results");

  const formatJson = (json: any) => {
    return JSON.stringify(json, null, 2);
  };

  return (
    <div className="flex flex-col overflow-hidden h-full">
      {/* Results tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-neutral-200 px-2 dark:bg-neutral-900 dark:border-neutral-700 transition-colors duration-200">
          <TabsList className="bg-transparent border-none p-0">
            <TabsTrigger 
              value="results" 
              className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none dark:text-neutral-300 dark:data-[state=active]:text-primary-400 transition-colors duration-200"
            >
              Results
            </TabsTrigger>
            {/* <TabsTrigger 
              value="visualization"
              className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none dark:text-neutral-300 dark:data-[state=active]:text-primary-400 transition-colors duration-200"
            >
              Visualization
            </TabsTrigger> */}
            <TabsTrigger 
              value="documentation"
              className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none dark:text-neutral-300 dark:data-[state=active]:text-primary-400 transition-colors duration-200"
            >
              Documentation
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2 flex items-center justify-between dark:bg-neutral-800 dark:border-neutral-700 transition-colors duration-200">
            <div className="flex items-center">
              {isLoading ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-primary-500"></span>
                  Processing
                </span>
              ) : result ? (
                result.success ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-green-500"></span>
                    Success
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-red-500"></span>
                    Error
                  </span>
                )
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-neutral-500"></span>
                  Ready
                </span>
              )}
              
              {result && (
                <span className="ml-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Execution time: {result.executionTime}ms
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <RefreshCcwIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="results" className="flex-1 flex flex-col overflow-hidden p-0 m-0 border-none">
            {/* Results content */}
            <div className="flex-1 p-4 overflow-auto font-mono text-sm bg-white dark:bg-neutral-900 transition-colors duration-200">
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded transition-colors duration-200"></div>
                  <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded w-3/4 transition-colors duration-200"></div>
                  <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded w-1/2 transition-colors duration-200"></div>
                </div>
              ) : result ? (
                <div className="bg-white border border-neutral-200 rounded-md shadow-sm dark:bg-neutral-900 dark:border-neutral-700 transition-colors duration-200">
                  <div className="border-b border-neutral-200 px-4 py-2 bg-neutral-50 flex items-center justify-between dark:bg-neutral-800 dark:border-neutral-700 transition-colors duration-200">
                    <span className="font-medium text-sm dark:text-neutral-300 transition-colors duration-200">Response</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500 dark:text-neutral-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 overflow-auto bg-white dark:bg-neutral-900 transition-colors duration-200">
                    <pre className="text-xs text-neutral-800 dark:text-neutral-300 transition-colors duration-200">
                      {formatJson(result)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8 border border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors duration-200">
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 font-medium transition-colors duration-200">No results to display</p>
                    <p className="text-neutral-500 text-xs mt-2 dark:text-neutral-400 transition-colors duration-200">Click the Run button to execute your code</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* <TabsContent value="visualization" className="flex-1 flex flex-col overflow-hidden p-0 m-0 border-none">
            <div className="flex-1 overflow-auto">
              <Visualization result={result} />
            </div>
          </TabsContent> */}
          
          <TabsContent value="documentation" className="flex-1 p-4 overflow-auto m-0 border-none">
            <div className="prose prose-sm text-neutral-600 max-w-none dark:text-neutral-200">
              <h3>True Network SDK Documentation</h3>
              <p>
                Use this sandbox to explore the True Network attestation and reputation protocol.
                The examples show how to create attestations, compute reputation scores, and build
                trust algorithms on the True Network protocol.
              </p>
              
              <h4>Getting Started</h4>
              <p>
                Select a template from the dropdown menu or write your own code to interact with
                the True Network API. Click the Run button to execute your code and see the results.
              </p>
              
              <h4>SDK Reference</h4>
              <ul>
                <li>TrueNetwork - Main client for interacting with the protocol</li>
                <li>Attestation - Create and manage attestations</li>
                <li>ReputationModel - Define how reputation scores are calculated</li>
                <li>Algorithm - Custom logic for processing attestations</li>
              </ul>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
