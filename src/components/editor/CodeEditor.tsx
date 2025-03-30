import { CodeLanguage } from "@/shared/schema";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import AceEditor from "react-ace";
import './TrueNetworkTheme'

import { useDarkMode } from "@/hooks/useDarkMode";


import 'ace-builds/src-noconflict/ace';
import 'brace/mode/javascript';
import 'brace/mode/typescript';

interface CodeEditorProps {
  code: string;
  language: CodeLanguage;
  onChange: (value: string) => void;
  filename: string;
  onCloseTab?: () => void;
}

export function CodeEditor({
  code,
  language,
  onChange,
  filename,
  onCloseTab
}: CodeEditorProps) {

  // State for client-side rendering
  const { isDarkMode, isInitialized } = useDarkMode()
  

  return (
    <div className="flex flex-col overflow-hidden h-full">
      {/* Editor tabs */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-2 flex items-center editor-tabs transition-colors duration-200">
        <div className="px-4 py-2 text-sm border-b-2 border-primary-500 dark:border-primary-600 text-primary-700 dark:text-primary-400 font-medium flex items-center editor-tab transition-colors duration-200">
          <span>{filename}</span>
          {onCloseTab && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCloseTab}
              className="ml-2 h-4 w-4 p-0 hover:bg-transparent hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200"
            >
              <XIcon className="h-3 w-3 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200" />
            </Button>
          )}
        </div>
        <div className="ml-auto px-3 py-1">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded editor-label transition-colors duration-200">
            {language}
          </span>
        </div>
      </div>

      {/* Editor container */}
      <div className="flex-1 overflow-auto p-0 relative bg-white dark:bg-neutral-900 editor-container transition-colors duration-200">
        {isInitialized ? ( 
          <AceEditor
            style={{
              height: '100%',
              width: '100%',
              flex: 1,
            }}
            className="w-full h-full  text-xs border-none outline-none resize-none"
            showPrintMargin={false}
            value={code}
            onChange={onChange}
            mode={'javascript'}
            theme={isDarkMode ? "true_network_dark" : "true_network_light"}
            fontSize={16}
            lineHeight={24}
            placeholder={`Type your ${language} code here...`}
            name="code-editor"
            highlightActiveLine
            wrapEnabled
            commands={[{
              name: 'Run Code',
              bindKey: {
                win: "Ctrl-Enter",
                mac: "Cmd-Enter"
              },
              exec: () => { }
            }]}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        ) : (
          <textarea value={code} className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 transition-colors duration-200" />
        )}
      </div>
    </div>
  );
}