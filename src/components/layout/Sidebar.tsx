import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CodeIcon, VerifiedIcon, BarChartIcon, BookOpenIcon, Twitter, FileCodeIcon, LucideGroup } from "lucide-react";
import { CodeTemplateCategory } from "@/shared/schema";

interface SidebarProps {
  readonly activeCategory: CodeTemplateCategory;
  readonly onCategoryChange: (category: CodeTemplateCategory) => void;
  readonly onExampleSelect: (exampleName: string) => void;
  readonly closeSidebar?: () => void;
}

export function Sidebar({ activeCategory, onCategoryChange, onExampleSelect, closeSidebar }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const examples = [
    { name: "Fetch Attestations", id: 'read-attestation', category: "attestations" as CodeTemplateCategory },
    { name: "Get Reputation", id: 'get-reputation-score', category: "reputation" as CodeTemplateCategory },
    { name: "Fetch Balance", id: 'get-free-balance', category: "algorithms" as CodeTemplateCategory }
  ];
  
  const filteredExamples = examples.filter(example => 
    example.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (category: CodeTemplateCategory) => {
    onCategoryChange(category);
    if (closeSidebar) closeSidebar();
  };

  const handleExampleSelect = (exampleName: string) => {
    onExampleSelect(exampleName);
    if (closeSidebar) closeSidebar();
  };

  return (
    <nav className="w-64 sm:w-56 h-full border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col transition-colors duration-300">
      <div className="p-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1.5 pr-8 border border-neutral-200 dark:border-neutral-700 rounded-md text-sm 
                       placeholder-neutral-400 dark:placeholder-neutral-500 dark:bg-neutral-800 dark:text-neutral-300
                       focus:ring-primary-500 dark:focus:ring-primary-600 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-400 dark:text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-3 mb-2">
            Core Functions
          </div>
          
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleCategoryChange("attestations")}
                className={`sidebar-item cursor-pointer flex items-center px-3 py-2 text-sm rounded-md w-full text-left ${
                  activeCategory === "attestations" 
                    ? "bg-primary-500 text-primary-700 font-medium dark:bg-primary-800 dark:text-primary-300 shadow-sm" 
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <VerifiedIcon className={`h-4 w-4 mr-2 ${activeCategory === "attestations" ? "text-primary-600 dark:text-primary-400" : ""}`} />
                Attestations
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryChange("reputation")}
                className={`sidebar-item cursor-pointer flex items-center px-3 py-2 text-sm rounded-md w-full text-left ${
                  activeCategory === "reputation" 
                    ? "bg-secondary text-primary-700 font-medium dark:bg-primary-800 dark:text-primary-300 shadow-sm" 
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <BarChartIcon className={`h-4 w-4 mr-2 ${activeCategory === "reputation" ? "text-primary-600 dark:text-primary-400" : ""}`} />
                Reputation Models
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryChange("utility")}
                className={`sidebar-item cursor-pointer flex items-center px-3 py-2 text-sm rounded-md w-full text-left ${
                  activeCategory === "utility" 
                    ? "bg-secondary text-primary-700 font-medium dark:bg-primary-800 dark:text-primary-300 shadow-sm" 
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <CodeIcon className={`h-4 w-4 mr-2 ${activeCategory === "utility" ? "text-primary-600 dark:text-primary-400" : ""}`} />
                Utilities
              </button>
            </li>
          </ul>
        </div>
        
        <div className="px-3 py-2">
          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-3 mb-2">
            Saved Examples
          </div>
          
          <ul className="space-y-1">
            {filteredExamples.map((example) => (
              <li key={example.name}>
                <button
                  onClick={() => handleExampleSelect(example.id)}
                  className="sidebar-item cursor-pointer flex items-center px-3 py-2 text-sm rounded-md w-full text-left text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <FileCodeIcon className="h-4 w-4 mr-2 text-neutral-400 dark:text-neutral-500" />
                  {example.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="px-3 py-2">
          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-3 mb-2">
            Resources
          </div>
          
          <ul className="space-y-1">
            <li>
              <a href="https://docs.truenetwork.io" target="_blank" className="sidebar-item cursor-pointer flex items-center px-3 py-2 text-sm rounded-md w-full text-left text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                <BookOpenIcon className="h-4 w-4 mr-2 text-neutral-400 dark:text-neutral-500" />
                Documentation
              </a>
            </li>
            <li>
              <a href="https://at.truenetwork.io/community" target="_blank" className="sidebar-item cursor-pointer flex items-center px-3 py-2 text-sm rounded-md w-full text-left text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                <LucideGroup className="h-4 w-4 mr-2 text-neutral-400 dark:text-neutral-500" />
                Dev Community
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <a href="https://x.com/truenetworkio" target="_blank" className="sidebar-item cursor-pointer flex items-center px-3 py-2 text-sm rounded-md w-full text-left text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
          <Twitter className="h-4 w-4 mr-2" />
          Follow Us
        </a>
      </div>
    </nav>
  );
}
