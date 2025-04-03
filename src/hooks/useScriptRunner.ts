import { useState } from "react"
import { Schema, U8, U16, U32, U64, F32, F64, Hash, Text, I16, I64, I32, I8, Char, bytesToBlakeTwo256Hash, stringToBlakeTwo256Hash, getFreeBalance, toTrueNetworkAddress } from "@truenetworkio/sdk"
import { getTrueNetworkInstance } from "../../true-network/true.config"

export enum LogStatus {
  SUCCESS = "success",
  ERROR = "error",
  RESPONSE = "response",
}

export interface Log {
  id: string
  message: string
  timestamp: number
  status: LogStatus
}

// Helper function to safely stringify any value including BigInt
const safeStringify = (obj: any, space?: number): string => {
  try {
    // Custom replacer function that handles BigInt
    const bigIntReplacer = (key: string, value: any) => {
      if (typeof value === 'bigint') {
        return Number(value); // Mark BigInts with 'n' suffix
      }
      return value;
    };
    
    return JSON.stringify(obj, bigIntReplacer, space);
  } catch (error) {
    // If the error is related to BigInt, try manual conversion
    if (error instanceof TypeError && error.message.includes('BigInt')) {
      try {
        // Recursively process object to handle BigInt values
        const processValue = (value: any): any => {
          if (value === null || value === undefined) {
            return value;
          }
          
          // Handle BigInt
          if (typeof value === 'bigint') {
            return Number(value);
          }
          
          // Handle arrays
          if (Array.isArray(value)) {
            return value.map(item => processValue(item));
          }
          
          // Handle objects (but not Date, RegExp, etc.)
          if (typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
            const result: Record<string, any> = {};
            for (const key in value) {
              if (Object.prototype.hasOwnProperty.call(value, key)) {
                result[key] = processValue(value[key]);
              }
            }
            return result;
          }
          
          return value;
        };
        
        // Process the object to make it safe for JSON.stringify
        const processed = processValue(obj);
        return JSON.stringify(processed, null, space);
      } catch (e) {
        console.error("Error in manual BigInt conversion:", e);
        return `{"error": "Failed to stringify object with BigInt values: ${e}"}`;
      }
    }
    
    // For other errors, return an error object
    console.error("Error stringifying object:", error);
    return `{"error": "Failed to stringify: ${error}"}`;
  }
};

export const useScriptRunner = () => {
  const [logs, setLogs] = useState<Log[]>([])

  const addLog = (message: string, status: LogStatus) => {
    const removingLeadingNewLine = message.replace(/^\n/, '');
    const newLog: Log = {
      id: Date.now().toString(),
      message: removingLeadingNewLine,
      timestamp: Date.now(),
      status,
    }
    setLogs((prevLogs) => [...prevLogs, newLog])

    return [...logs, newLog]
  }

  const clearLogs = () => {
    setLogs([])
  }

  const extendScript = (script: string) => {
    const extendedScript = `
      const startScript = async () => {
        // Store original console methods at the beginning
        const originalConsoleLog = console.log;
        
        try {
          // Define the logging function
          function addConsoleLog(...args) {
            const isError = args.some(arg => typeof arg === 'string' && arg.includes('error'));
            const message = args.map(arg => {
              if (arg === null) return 'null';
              if (arg === undefined) return 'undefined';
              
              // Handle BigInt values in console.log
              if (typeof arg === 'bigint') {
                return Number(arg);
              }
              
              // Handle objects that might contain BigInt
              if (typeof arg === 'object') {
                try {
                  // Use our safe stringify helper
                  return safeStringify(arg);
                } catch (e) {
                  return '[Object that cannot be stringified]';
                }
              }
              
              return String(arg);
            }).join(' ');
            addLog(message, isError ? LogStatus.ERROR : LogStatus.SUCCESS);
          }
          
          // Override console.log only within this scope
          console.log = function(...args) {
            addConsoleLog(...args);
            return originalConsoleLog.apply(console, args);
          };
          
          // Run the provided script
          ${script}
        } catch (e) {
          // Log the error using our custom logger
          addLog(e.message, "error");
        
          // Restore original console.log before exiting
          console.log = originalConsoleLog;
          
          throw e;
        } finally {
          // Restore original console.log
          console.log = originalConsoleLog;
        }
      }
    
      return startScript();
    `;

    return extendedScript;
  };

  const runScript = async (script: string) => {
    try {
      clearLogs();
      // eslint-disable-next-line no-new-func
      const f = new Function(
        "addLog",
        "LogStatus",
        "getTrueNetworkInstance",
        "Schema",
        "U8", "U16", "U32", "U64",
        "F32", "F64",
        "Hash", "Text",
        "I16", "I64", "I32", "I8",
        "Char",
        "bytesToBlakeTwo256Hash",
        "stringToBlakeTwo256Hash",
        "getFreeBalance",
        "toTrueNetworkAddress",
        "safeStringify",
        extendScript(script)
      );

      const response = await f(
        addLog, LogStatus, getTrueNetworkInstance, Schema,
        U8, U16, U32, U64,
        F32, F64,
        Hash, Text,
        I16, I64, I32, I8,
        Char,
        bytesToBlakeTwo256Hash, stringToBlakeTwo256Hash,
        getFreeBalance, toTrueNetworkAddress,
        safeStringify
      );

      // Use safeStringify instead of JSON.stringify to handle BigInt values
      const outcome = addLog(safeStringify(response ?? {}, 2), LogStatus.RESPONSE);

      return outcome;
    } catch (error) {
      if (logs.findIndex(log => log.message.includes(String(error))) === -1) {
        addLog(`${error}`, LogStatus.ERROR);
      }
      // Return the logs even if there was an error
      return logs;
    }
  };

  return {
    logs,
    clearLogs,
    runScript,
  }
}