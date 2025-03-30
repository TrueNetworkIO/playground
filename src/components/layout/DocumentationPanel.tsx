import { useEffect } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface DocumentationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
}

export function DocumentationPanel({ isOpen, onClose, activeCategory }: DocumentationPanelProps) {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return (
    <div>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-white text-black dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div className="border-b border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between">
            <h3 className="font-medium dark:text-white">Documentation</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <XIcon className="h-4 w-4 dark:text-neutral-400" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 text-black ">
            {activeCategory === "attestations" && (
              <div>
                <h4 className="text-lg text-black font-medium mb-2 dark:text-white">Attestation</h4>
                <p className="text-sm text-black dark:text-neutral-300 mb-4">
                  Attestations are statements made by an issuer about a subject.
                </p>
              </div>
            )}
  
            {activeCategory === "reputation" && (
              <div>
                <h4 className="text-lg text-black font-medium mb-2 dark:text-white">Reputation Models</h4>
                <p className="text-sm text-black dark:text-neutral-300 mb-4">
                  Reputation models define how attestations are weighted.
                </p>
              </div>
            )}
  
            {activeCategory === "algorithms" && (
              <div>
                <h4 className="text-lg text-black font-medium mb-2 dark:text-white">Algorithms</h4>
                <p className="text-sm text-black dark:text-neutral-300 mb-4">
                  Algorithms process attestations and compute reputation scores.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}