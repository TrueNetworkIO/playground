import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  PlayIcon, 
  SaveIcon, 
  CopyIcon, 
  ShareIcon, 
  CodeIcon, 
  BarChartIcon,
  MoreHorizontalIcon
} from "lucide-react";
import { CodeLanguage } from "@/shared/schema";
import { templates } from "@/lib/templates";

interface ToolbarProps {
  selectedTemplate: string;
  language: CodeLanguage;
  onTemplateChange: (template: string) => void;
  onLanguageChange: (language: CodeLanguage) => void;
  onRun: () => void;
  onSave: () => void;
  onShare: () => void;
  onNew: () => void;
  isRunning: boolean;
  isMobile?: boolean;
  activePanel?: 'editor' | 'results';
  onPanelChange?: (panel: 'editor' | 'results') => void;
}

export function Toolbar({
  selectedTemplate,
  onTemplateChange,
  onRun,
  isRunning,
  isMobile = false,
  activePanel = 'editor',
  onPanelChange
}: ToolbarProps) {
  const templateOptions = templates.map(template => ({
    value: template.id,
    label: template.title
  }));

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2 sm:p-3 flex items-center justify-between">
      {isMobile ? (
        // Mobile Toolbar
        <>
          <div className="flex items-center space-x-2">
            {/* Template select dropdown */}
            <div className="relative">
              <Select value={selectedTemplate} onValueChange={onTemplateChange}>
                <SelectTrigger className="w-[130px] h-9 text-sm text-black dark:bg-neutral-800 border-neutral-700 dark:text-neutral-200">
                  <SelectValue placeholder="Template" />
                </SelectTrigger>
                <SelectContent>
                  {templateOptions.map(template => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Editor/Results Tabs - Only on mobile */}
            {onPanelChange && (
              <div className="flex border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
                <button
                  onClick={() => onPanelChange('editor')}
                  className={`px-3 py-1.5 text-sm flex items-center ${
                    activePanel === 'editor'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  <CodeIcon className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">Editor</span>
                </button>
                <button
                  onClick={() => onPanelChange('results')}
                  className={`px-3 py-1.5 text-sm flex items-center ${
                    activePanel === 'results'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  <BarChartIcon className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">Results</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Run button - always visible */}
            <Button 
              variant="default" 
              size="sm" 
              onClick={onRun} 
              disabled={isRunning}
              className="h-9 text-sm bg-primary-500 text-white hover:bg-primary-600 flex items-center"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin mr-1.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <PlayIcon className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">Run</span>
                </>
              )}
            </Button>

            {/* More menu for other actions */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 dark:border-neutral-700 dark:bg-neutral-800">
                  <MoreHorizontalIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={onNew}>
                  <CopyIcon className="h-4 w-4 mr-2" />
                  New File
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSave}>
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onShare}>
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </>
      ) : (
        // Desktop Toolbar
        <>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Select value={selectedTemplate} onValueChange={onTemplateChange}>
                <SelectTrigger className="w-[200px] cursor-pointer h-9 text-sm text-black dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templateOptions.map(template => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="default" 
              size="sm" 
              onClick={onRun} 
              disabled={isRunning}
              className="h-9 text-sm bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-200 disabled:opacity-70 flex items-center"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  <PlayIcon className="h-4 w-4 mr-1.5" />
                  Run
                </>
              )}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            
            
            {/* <Button variant="outline" size="sm" onClick={onShare} className="h-9 text-sm text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <ShareIcon className="h-4 w-4 mr-1.5" />
              Share
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
}
