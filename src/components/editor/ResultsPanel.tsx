import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RefreshCcwIcon } from "lucide-react";
import 'brace/mode/json';
import { clsx } from "clsx";
import { Log, LogStatus } from "@/hooks/useScriptRunner";
import AceEditor from "react-ace";
import { useDarkMode } from "@/hooks/useDarkMode";

import './TrueNetworkTheme';
import Logs from "../ui/log";
import { getTrueNetworkInstance } from "../../../true-network/true.config";

interface ResultsPanelProps {
  readonly result: Log[] | null;
  readonly isLoading: boolean;
}

export function ResultsPanel({ result, isLoading }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState("results");
  const [isConnected, setIsConnected] = useState(false);
  const [viewMode, setViewMode] = useState('code'); // 'code' or 'table'

  const [collapsed, setCollapsed] = useState(false);

  const { isDarkMode, isInitialized } = useDarkMode();

  const [mintTimeStamp, setMintTimeStamp] = useState<number>(0);

  useEffect(() => {
    if (isLoading) setMintTimeStamp(Date.now());
  }, [isLoading])


  useEffect(() => {
    const connect = async () => {
      const trueApi = await getTrueNetworkInstance();
      if (trueApi?.network.isConnected) { // Check if trueApi is not null or undefined
        setIsConnected(true);
      }
    };

    connect();
  }, []);

  const formatJson = (str: any) => {
    try {
      // Parse the JSON string into an object
      const jsonObj = JSON.parse(str);
      // Stringify with indentation for nice formatting
      return JSON.stringify(jsonObj, null, 2);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return str;
    }
  };

  const renderStatus = () => {
    if (isLoading) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
          <div className="inline-flex items-center">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-primary-500"></span>
          </div>
          Processing
        </span>
      );
    }

    if (result && result.length > 0) {
      const hasResponse = result.some((v) => v.status === LogStatus.RESPONSE);
      return hasResponse ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          <div className="inline-flex items-center">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-green-500"></span>
          </div>
          Success
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
          <div className="inline-flex items-center">
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-red-500"></span>
          </div>
          Error
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
        <span className={clsx("w-1.5 h-1.5 mr-1.5 rounded-full bg-neutral-500", isConnected ? 'bg-green-500' : 'bg-red-500')}></span>
        {isConnected ? 'Ready' : 'Disconnected'}
      </span>
    );
  };

  const showLogs = () => {
    const logs = result?.filter((log => log.status !== LogStatus.RESPONSE)) ?? [];
    let content = <></>;

    if (isLoading) {
      content = (
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded transition-colors duration-200"></div>
          <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded w-3/4 transition-colors duration-200"></div>
          <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded w-1/2 transition-colors duration-200"></div>
        </div>
      );
    } else if (result && logs.length > 0) {
      content = (
        <div className="mb-4 bg-white border border-neutral-200 rounded-md shadow-sm dark:bg-neutral-900 dark:border-neutral-700 transition-colors duration-200">
          <div className="border-b border-neutral-200 px-4 py-2 bg-neutral-50 flex items-center justify-between dark:bg-neutral-800 dark:border-neutral-700 transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm text-neutral-600 dark:text-neutral-300 transition-colors duration-200">
                ⚠️ Logs
              </span>
              {logs.length > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 transition-colors duration-200">
                  {logs.length}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? "Expand logs" : "Collapse logs"}
                title={collapsed ? "Expand logs" : "Collapse logs"}
              >
                {collapsed ? (
                  <ChevronDown className="h-4 w-4 text-neutral-500 dark:text-neutral-400 transition-colors duration-200" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-neutral-500 dark:text-neutral-400 transition-colors duration-200" />
                )}
              </Button>
            </div>
          </div>

          {!collapsed && (
            <div className="p-2 overflow-auto bg-white dark:bg-neutral-900 transition-colors duration-200">
              <div className="max-h-84 text-xs text-neutral-800 dark:text-neutral-300 transition-colors duration-200">
                <Logs logs={logs} maxHeight="max-h-auto" />
              </div>
            </div>
          )}
        </div>
      );
    }

    return content;
  }

  const showResult = () => {
    let content;

    const jsonResponse = result?.find((r) => r.status === LogStatus.RESPONSE)?.message;

    // Function to convert JSON to table data
    const convertToTableData = (json: string) => {
      try {
        const parsedJson = typeof json === 'string' ? JSON.parse(json) : json;

        // Extract all possible keys for the table headers
        const allKeys = new Set();
        const rows: any = [];

        // Handle array of objects
        if (Array.isArray(parsedJson)) {
          parsedJson.forEach(item => {
            if (typeof item === 'object' && item !== null) {
              Object.keys(item).forEach(key => allKeys.add(key));
              rows.push(item);
            } else {
              // Handle primitive values in arrays
              rows.push({ value: item });
              allKeys.add('value');
            }
          });
        }
        // Handle single object
        else if (typeof parsedJson === 'object' && parsedJson !== null) {
          Object.entries(parsedJson).forEach(([key, value]) => {
            // For nested objects/arrays, stringify them
            if (typeof value === 'object' && value !== null) {
              rows.push({
                key: key,
                value: JSON.stringify(value)
              });
            } else {
              rows.push({
                key: key,
                value: value
              });
            }
          });
          allKeys.add('key');
          allKeys.add('value');
        }

        return {
          headers: Array.from(allKeys),
          rows: rows
        };
      } catch (error) {
        console.error("Error converting to table:", error);
        return { headers: ['Error'], rows: [{ Error: 'Failed to parse JSON' }] };
      }
    };

    const isValidUrl = (str: string) => {
      try {
        // Try creating a URL object - this will throw an error for invalid URLs
        new URL(str);
        return true;
      } catch (err) {
        return false;
      }
    };

    // Function to render table cell content based on value type
    const renderCellContent = (value: any) => {
      if (value === null || value === undefined) {
        return '';
      }

      // Convert to string for display
      const stringValue = String(value);

      // Check if the value is a URL
      if (typeof value === 'string' && isValidUrl(value)) {
        // URLs that start with http:// or https://
        if (value.startsWith('http://') || value.startsWith('https://')) {
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
            >
              {value.length > 50 ? `${value.substring(0, 47)}...` : value}
            </a>
          );
        }
      }

      // Check if the value might be a JSON string that contains URLs
      if (typeof value === 'string' && (value.includes('"http') || value.includes('":"/'))) {
        try {
          // Try to parse it as JSON
          const parsedJson = JSON.parse(value);

          // If successful and it's an object, it might contain URLs we need to process
          if (typeof parsedJson === 'object' && parsedJson !== null) {
            return JSON.stringify(parsedJson);
          }
        } catch (e) {
          // Not valid JSON, continue with regular rendering
        }
      }

      // For very long strings, truncate them
      if (typeof value === 'string' && value.length > 100) {
        return (
          <div className="group relative">
            <span>{value.substring(0, 97)}...</span>
            <span className="hidden group-hover:block absolute left-0 top-full bg-white dark:bg-neutral-800 p-2 rounded shadow-lg z-10 max-w-md text-xs border border-neutral-200 dark:border-neutral-700">
              {value}
            </span>
          </div>
        );
      }

      // Regular value rendering
      return stringValue;
    };

    // Function to render the table view
    const renderTableView = (json: any) => {
      const { headers, rows } = convertToTableData(json);

      return (
        <div className="overflow-auto max-h-128">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                {headers.map((header: any, index) => (
                  <th
                    key={header.toString()}
                    className="px-4 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 tracking-wider"
                  >
                    {header.toString()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
              {rows.map((row: any, rowIndex: number) => (
                <tr key={row.toString()}>
                  {headers.map((header, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className="px-4 py-2 whitespace-normal text-sm text-neutral-800 dark:text-neutral-300"
                    >
                      {row[header as any] !== undefined
                        ? typeof row[header as any] === 'object'
                          ? JSON.stringify(row[header as any])
                          :
                          renderCellContent(String(row[header as any]))
                        : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    if (isLoading) {
      content = (
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded transition-colors duration-200"></div>
          <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded w-3/4 transition-colors duration-200"></div>
          <div className="h-6 bg-neutral-100 dark:bg-neutral-800 rounded w-1/2 transition-colors duration-200"></div>
        </div>
      );
    } else if (jsonResponse) {
      content = (
        <div className="bg-white border border-neutral-200 rounded-md shadow-sm dark:bg-neutral-900 dark:border-neutral-700 transition-colors duration-200">
          <div className="border-b border-neutral-200 px-4 py-2 bg-neutral-50 flex items-center justify-between dark:bg-neutral-800 dark:border-neutral-700 transition-colors duration-200">
            <span className="font-medium text-sm text-neutral-600 dark:text-neutral-300 transition-colors duration-200">✨ Response</span>
            <div className="flex items-center space-x-1">
              {/* View toggle buttons */}
              <div className="flex items-center mr-2 bg-neutral-100 dark:bg-neutral-700 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('code')}
                  className={`cursor-pointer px-2 py-1 text-xs transition-colors duration-200 ${viewMode === 'code'
                    ? 'bg-[#FF4000] text-white'
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  JSON
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`cursor-pointer px-2 py-1 text-xs transition-colors duration-200 ${viewMode === 'table'
                    ? 'bg-[#FF4000] text-white'
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Table
                </button>
              </div>

              {/* Copy button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(
                    typeof jsonResponse === 'string' ? jsonResponse : formatJson(jsonResponse)
                  );
                }}
                title="Copy to clipboard"
                className="h-6 w-6 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500 dark:text-neutral-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>
          </div>

          <div className="p-4 overflow-auto bg-white dark:bg-neutral-900 transition-colors duration-200">
            <div className="min-h-128 flex flex-1 h-auto text-xs text-neutral-800 dark:text-neutral-300 transition-colors duration-200">
              {viewMode === 'code' ? (
                <AceEditor
                  style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    flex: 1,
                  }}
                  readOnly
                  className="flex flex-1 min-h-128 text-xs border-none outline-none resize-none"
                  showPrintMargin={false}
                  value={formatJson(jsonResponse ?? {})}
                  mode={'json'}
                  theme={isDarkMode ? "true_network_dark" : "true_network_light"}
                  fontSize={16}
                  lineHeight={24}
                  placeholder={`Type your code here...`}
                  name="code-editor"
                  wrapEnabled
                  showGutter={false}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    tabSize: 2,
                  }}
                />
              ) : (
                renderTableView(jsonResponse)
              )}
            </div>
          </div>
        </div>
      );
    } else {
      content = (
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
      );
    }

    return content;
  }

  const executionTime = (result && result.length > 0) ? Math.abs(Math.floor((mintTimeStamp - result[0].timestamp) / 1000)) : 0;

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
              value="documentation"
              className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary-500 data-[state=active]:text-primary-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none dark:text-neutral-300 dark:data-[state=active]:text-primary-400 transition-colors duration-200"
            >
              Documentation
            </TabsTrigger> */}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2 flex items-center justify-between dark:bg-neutral-800 dark:border-neutral-700 transition-colors duration-200">
            <div className="flex items-center">


              {renderStatus()}

              {result && (
                <span className="ml-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Execution time: {executionTime > 12 ? 6 : executionTime}s
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
              {showLogs()}
              {showResult()}
            </div>
          </TabsContent>

          {/* <TabsContent value="documentation" className="flex-1 p-4 overflow-auto m-0 border-none">
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
          </TabsContent> */}
        </div>
      </Tabs>
    </div>
  );
}