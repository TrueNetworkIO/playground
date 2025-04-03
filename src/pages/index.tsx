import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { DocumentationPanel } from "@/components/layout/DocumentationPanel";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ResultsPanel } from "@/components/editor/ResultsPanel";
import { Toolbar } from "@/components/editor/Toolbar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { templates, getTemplateById } from "@/lib/templates";
import { CodeLanguage, NetworkType, CodeTemplateCategory } from "@/shared/schema";
import { PanelLeftIcon, PanelRightIcon } from "lucide-react";
import { useScriptRunner } from "@/hooks/useScriptRunner";
import Head from "next/head";

export default function Playground() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [code, setCode] = useState<string>("");
  const [filename, setFilename] = useState<string>("attestation.ts");
  const [language, setLanguage] = useState<CodeLanguage>("typescript");
  const [network, setNetwork] = useState<NetworkType>("testnet");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("create-attestation");
  const [activeCategory, setActiveCategory] = useState<CodeTemplateCategory>("attestations");
  const [showDocsPanel, setShowDocsPanel] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [activePanel, setActivePanel] = useState<'editor' | 'results'>(isMobile ? 'editor' : 'results');

  const { runScript, logs } = useScriptRunner()

  const executeMutation = useMutation({
    mutationFn: async () => {
      const data = await runScript(code);
      return {}
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Code executed successfully",
        description: "Check the results panel for details",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Execution failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  });

  // We're no longer using Monaco Editor, so no need to setup typings
  // Keep this comment as a placeholder for when we re-implement Monaco

  // Load template code when selected template changes
  useEffect(() => {
    const template = getTemplateById(selectedTemplate);
    if (template) {
      setCode(template.code);
      setLanguage(template.language);
      setFilename(`${template.id}.${template.language === "typescript" ? "ts" : "json"}`);
      setActiveCategory(template.category);
    }
  }, [selectedTemplate]);

  const handleRun = () => {
    executeMutation.mutate();
  };

  const handleShare = () => {
    toast({
      title: "Share link created",
      description: "Copy the link from your address bar to share this code",
    });
  };

  const handleNew = () => {
    setSelectedTemplate("custom-template");
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleLanguageChange = (lang: CodeLanguage) => {
    setLanguage(lang);
  };

  const handleNetworkChange = (net: NetworkType) => {
    setNetwork(net);
  };

  const handleCategoryChange = (category: CodeTemplateCategory) => {
    setActiveCategory(category);
    // Select the first template in this category
    const templatesInCategory = templates.filter(t => t.category === category);
    if (templatesInCategory.length > 0) {
      setSelectedTemplate(templatesInCategory[0].id);
    }
  };

  const handleExampleSelect = (exampleName: string) => {
    const template = templates.find(t => t.id === exampleName);
    if (template) {
      setSelectedTemplate(template.id);
    }
  };

  // Auto-hide sidebar on mobile when executing code (to show results)
  useEffect(() => {
    if (isMobile && executeMutation.isPending) {
      setShowSidebar(false);
      setActivePanel('results');
    }
  }, [executeMutation.isPending, isMobile]);

  // When results come in on mobile, switch to results panel
  useEffect(() => {
    if (isMobile && executeMutation.data) {
      setActivePanel('results');
    }
  }, [executeMutation.data, isMobile]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Head>
        <title>Playground | True Network: Make On-Chain Attestations Easily</title>
        <meta name="description" content="True Network Playground comprises of on-chain attestations & reputation code snippets that you can run in realtime." />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta property="og:title" content="Playground | True Network" />
        <meta property="og:description" content="True Network Playground comprises of on-chain attestations & reputation code snippets that you can run in realtime." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Playground | True Network" />
        <meta name="twitter:description" content="True Network Playground comprises of on-chain attestations & reputation code snippets that you can run in realtime." />
      </Head>
      <Header
        network={network}
        onNetworkChange={handleNetworkChange}
        isMobile={isMobile}
        toggleSidebar={() => setShowSidebar(!showSidebar)}
        showSidebar={showSidebar}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with slide-in behavior on mobile */}
        <div
          className={`
            ${isMobile ? (showSidebar ? 'translate-x-0' : '-translate-x-full') : ''} 
            transition-transform duration-200 ease-in-out
            ${isMobile ? 'absolute z-30 h-[calc(100%-4rem)] mt-16 shadow-lg' : 'relative'}
            ${!isMobile && !showSidebar ? 'hidden' : ''}
          `}
        >
          <Sidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onExampleSelect={handleExampleSelect}
            closeSidebar={() => isMobile && setShowSidebar(false)}
          />
        </div>

        {/* Semi-transparent overlay when sidebar is open on mobile */}
        {isMobile && showSidebar && (
          <div
            className="fixed inset-0 bg-black/20 z-20"
            onClick={() => setShowSidebar(false)}
            aria-hidden="true"
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden bg-neutral-50 dark:bg-neutral-900">
          <Toolbar
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
            activeCategory={activeCategory}
            onRun={() => {
              handleRun();
              if (isMobile) {
                setActivePanel('results');
              }
            }}
            isRunning={executeMutation.isPending}
            isMobile={isMobile}
            activePanel={activePanel}
            onPanelChange={setActivePanel}
          />

          {isMobile ? (
            // On mobile, use a tabbed interface instead of split panels
            <div className="flex-1 overflow-hidden">
              <div className={`h-full ${activePanel === 'editor' ? 'block' : 'hidden'}`}>
                <CodeEditor
                  code={code}
                  onRun={() => {
                    handleRun();
                    if (isMobile) {
                      setActivePanel('results');
                    }
                  }}
                  language={language}
                  onChange={setCode}
                  filename={filename}
                />
              </div>
              <div className={`h-full ${activePanel === 'results' ? 'block' : 'hidden'}`}>
                <ResultsPanel
                  result={logs}
                  isLoading={executeMutation.isPending}
                />
              </div>

              {/* Mobile panel switcher */}
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 bg-white dark:bg-neutral-800 shadow-lg rounded-full border border-neutral-200 dark:border-neutral-700 p-1">
                <button
                  onClick={() => setActivePanel('editor')}
                  className={`p-2 rounded-full ${activePanel === 'editor' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-neutral-500 dark:text-neutral-400'}`}
                >
                  <PanelLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActivePanel('results')}
                  className={`p-2 rounded-full ${activePanel === 'results' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-neutral-500 dark:text-neutral-400'}`}
                >
                  <PanelRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            // On desktop, use resizable panels
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={50} minSize={30}>
                <CodeEditor
                  code={code}
                  onRun={() => {
                    handleRun();
                    if (isMobile) {
                      setActivePanel('results');
                    }
                  }}
                  language={language}
                  onChange={setCode}
                  filename={filename}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={50} minSize={30}>
                <ResultsPanel
                  result={logs}
                  isLoading={executeMutation.isPending}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </main>
      </div>

      <DocumentationPanel
        isOpen={showDocsPanel}
        onClose={() => setShowDocsPanel(false)}
        activeCategory={activeCategory}
      />
    </div>
  );
}
